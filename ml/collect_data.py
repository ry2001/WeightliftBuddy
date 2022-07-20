import cv2
import mediapipe as mp
import numpy as np
import math as m
import time
from csv import writer
from create_model import params


# Colors.
blue = (255, 127, 0)
red = (50, 50, 255)
green = (127, 255, 0)
dark_blue = (127, 20, 0)
light_green = (127, 233, 100)
yellow = (0, 255, 255)
pink = (255, 0, 255)
black = (0,0,0)
dark_green = (1, 50, 32)

# Font type.
font = cv2.FONT_HERSHEY_SIMPLEX

# Initialize frame counters.
good_frames = 0
bad_frames  = 0

def findDistance(x1, y1, x2, y2):
    dist = m.sqrt((x2-x1)**2+(y2-y1)**2)
    return dist

def findAngle(x1, y1, x2, y2):
    theta = m.acos((y2 -y1)*(-y1) / (m.sqrt((x2 - x1)**2 + (y2 - y1)**2 ) * y1))
    degree = int(180/m.pi)*theta
    return degree
    
def calculate_angle(a,b,c):
    a = np.array(a) # First
    b = np.array(b) # Mid
    c = np.array(c) # End
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    if angle >180.0:
        angle = 360-angle
    return angle 

#send warning when bad posture is detected
def sendWarning(image, offset, w, font, red):
    cv2.putText(image, str(int(offset)) + ' Poor posture', (w - 150, 130), font, 0.9, red, 2)
    pass

def determine_posture(knee_angle, torso_angle, params):
    datapoints = [15,20,25,30,35,40]
    i = params[datapoints[round(torso_angle/5)-3]]
    if knee_angle > i[0]:
        if knee_angle < i[1]:
            message = 'good posture'
            print(message)
            return 0, message
        else:
            message = 'your back is too high'
            print(message)
            return 1, message
    else:
        message = 'your back is too low'
        print(message)
        return -1, message

def main():

    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose

    # for webcam
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

    # # for upload
    # file_name = 'path to file' # file in uploads
    # cap = cv2.VideoCapture(file_name)

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    frame_size = (width, height)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')

    # Video writer.
    # video_output = cv2.VideoWriter('output.mp4', fourcc, fps, frame_size)

    ## Setup mediapipe instance
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            # read file for each frame
            success, frame = cap.read() # success, image
            if not success:
                print("Null.Frames")
                break
            
            # Get fps.
            fps = cap.get(cv2.CAP_PROP_FPS)

            # Get height and width of the frame.
            h, w = frame.shape[:2]

            # Recolor image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
        
            # Make detection
            keypoints = pose.process(image)
        
            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            try:
        # # find coords = nomalised coords * width/height

                # normalised coords = pose.process(image).pose_landmark.landmark[MediaPipe.solutions.pose.PoseLandmark.<SPECIFIC_LANDMARK>].coordinate
                landmarks = keypoints.pose_landmarks.landmark

                #shoulder coords
                left_shoulder_x, left_shoulder_y = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h
                right_shoulder_x, right_shoulder_y = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h

                # hip coords
                left_hip_x, left_hip_y = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * h
                right_hip_x, right_hip_y = landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y * h

                #knee coords
                left_knee_x, left_knee_y = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h
                right_knee_x, right_knee_y = landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y * h
                
                # ankle coord
                left_ankle_x, left_ankle_y = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x * w, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y * h
                right_ankle_x, right_ankle_y = landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x * w, landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y * h
                
        # # Assist to align the camera to point at the side view of the person.
                # Calculate distance between left shoulder and right shoulder points.
                offset = findDistance(left_shoulder_x, left_shoulder_y, right_shoulder_x, right_shoulder_y)

                # Offset threshold 30 is based on results obtained from analysis over 100 samples.
                if offset < 100:
                    cv2.putText(image, str(int(offset)) + ' Aligned', (w - 160, 30), font, 0.9, black, 2)
                else:
                    cv2.putText(image, str(int(offset)) + ' Not Aligned', (w - 250, 30), font, 0.9, black, 2)
                

                left_side = False
                right_side = False

                if (landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].visibility + 
                    landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].visibility + 
                    landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].visibility) < (landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].visibility + 
                    landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].visibility + 
                    landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].visibility) :
                    right_side = True
                    
                else: 
                    left_side = True


                if left_side:
                    left_hip=(left_hip_x, left_hip_y)
                    left_knee=(left_knee_x, left_knee_y)
                    left_ankle=(left_ankle_x, left_ankle_y)
                    knee_angle= calculate_angle(left_hip, left_knee, left_ankle)
                    torso_angle = findAngle(left_hip_x, left_hip_y, left_shoulder_x, left_shoulder_y)
            

                else: 
                    right_hip=(right_hip_x, right_hip_y)
                    right_knee=(right_knee_x, right_knee_y)
                    right_ankle=(right_ankle_x, right_ankle_y)
                    knee_angle= calculate_angle(right_hip, right_knee, right_ankle)
                    torso_angle = findAngle(right_hip_x, right_hip_y, right_shoulder_x, right_shoulder_y)
        

        ## add data to csv for data collection
                data = [torso_angle, knee_angle]
                with open('./ml/data_zenton.cqsv', 'a', newline='') as f_object:  
                    writer_object = writer(f_object)
                    writer_object.writerow(data)  
                    f_object.close()
                
                
            # # Put text, Posture and angle inclination.
                angle_text_string = '  Torso : ' + str(int(torso_angle))
                cv2.putText(image, angle_text_string, (10, 30), font, 0.9, dark_green, 2)

            # # Determine whether good posture or bad posture.
                posture, message = determine_posture(knee_angle, torso_angle, params)
        
                if posture == 0:
                    bad_frames = 0
                    good_frames += 1
                    
                    cv2.putText(image, message, (10, 60), font, 0.9, light_green, 2)
                    # cv2.putText(image, str(int(torso_angle)), (left_hip_x + 10, left_hip_y), font, 0.9, light_green, 2)
                    # cv2.putText(image, str(int(knee_angle)), (left_hip_x + 10, left_hip_y+20), font, 0.9, light_green, 2)
    
                elif posture == 1 or posture == -1:
                    good_frames = 0
                    bad_frames += 1
                
                    cv2.putText(image, message, (10, 60), font, 0.9, red, 2)
                    # cv2.putText(image, str(int(torso_angle)), (left_hip_x + 10, left_hip_y), font, 0.9, red, 2)
                    # cv2.putText(image, str(int(knee_angle)), (left_hip_x + 10, left_hip_y+20), font, 0.9, red, 2)
                else:
                    pass
                # Calculate the time of remaining in a particular posture.
                fps = 15
                good_time = (1 / fps) * good_frames
                bad_time =  (1 / fps) * bad_frames
                print(good_time)
                
                # Pose time.
                if good_time > 0:
                    time_string_good = 'Good Posture Time : ' + str(round(good_time, 1)) + 's'
                    cv2.putText(image, time_string_good, (10, h - 20), font, 0.9, green, 2)
                else:
                    time_string_bad = 'Bad Posture Time : ' + str(round(bad_time, 1)) + 's'
                    cv2.putText(image, time_string_bad, (10, h - 20), font, 0.9, red, 2)
                
                # If you stay in bad posture for more than 3 minutes (180s) send an alert.
                # if bad_time > 3:
                #     sendWarning(image, offset, w, font, red)
                
            except:
                pass

            # Render detections
            mp_drawing.draw_landmarks(image, keypoints.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                    mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2) 
                                    )  

            # mp_drawing.draw_landmarks(annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS, landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())          
            
            cv2.imshow('Mediapipe Feed', image)
    

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()
main()

