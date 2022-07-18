import cv2
import mediapipe as mp
import numpy as np
import math as m
import time
from mediapipe.framework.formats import landmark_pb2


# Colors.
blue = (255, 127, 0)
red = (50, 50, 255)
green = (127, 255, 0)
dark_blue = (127, 20, 0)
light_green = (127, 233, 100)
yellow = (0, 255, 255)
pink = (255, 0, 255)

# Font type.
font = cv2.FONT_HERSHEY_SIMPLEX

# Initialize frame counters.
good_frames = 0
bad_frames = 0


def findDistance(x1, y1, x2, y2):
    dist = m.sqrt((x2-x1)**2+(y2-y1)**2)
    return dist


def findAngle(x1, y1, x2, y2):
    theta = m.acos((y2 - y1)*(-y1) /
                   (m.sqrt((x2 - x1)**2 + (y2 - y1)**2) * y1))
    degree = int(180/m.pi)*theta
    return degree


def calculate_angle(a, b, c):
    a = np.array(a)  # First
    b = np.array(b)  # Mid
    c = np.array(c)  # End

    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - \
        np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)

    if angle > 180.0:
        angle = 360-angle

    return angle

# send warning when bad posture is detected


def sendWarning(image, offset, w, font, red):
    cv2.putText(image, str(int(offset)) + ' Poor posture',
                (w - 150, 130), font, 0.9, red, 2)
    pass


def determine_posture(knee_angle, torso_angle):
    if torso_angle > 29 and torso_angle < 31:
        if knee_angle_left < 135 and knee_angle_left > 120:
            print('good')
    pass


def main():
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose

    # for webcam
    # cap = cv2.VideoCapture(0)
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

    # Setup mediapipe instance
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            # read file for each frame
            success, frame = cap.read()  # success, image
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

                # shoulder coords
                left_shoulder_x, left_shoulder_y = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * \
                    w, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h
                right_shoulder_x, right_shoulder_y = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * \
                    w, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h

                # hip coords
                left_hip_x, left_hip_y = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * \
                    w, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * h
                right_hip_x, right_hip_y = landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x * \
                    w, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y * h

                # knee coords
                left_knee_x, left_knee_y = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * \
                    w, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h
                right_knee_x, right_knee_y = landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x * \
                    w, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y * h

                # ankle coord
                left_ankle_x, left_ankle_y = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x * \
                    w, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y * h
                right_ankle_x, right_ankle_y = landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x * \
                    w, landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y * h

        # # Assist to align the camera to point at the side view of the person.

                # Calculate distance between left shoulder and right shoulder points.
                offset = findDistance(
                    left_shoulder_x, left_shoulder_y, right_shoulder_x, right_shoulder_y)

                # Offset threshold 30 is based on results obtained from analysis over 100 samples.
                if offset < 100:
                    # cv2.putText(image, str(int(offset)) + ' Aligned', (w - 160, 30), font, 0.9, green, 2)
                    cv2.putText(image, str(int(offset)) + ' Aligned',
                                (w - 160, 30), font, 0.9, (0, 0, 0), 2)
                else:
                    cv2.putText(image, str(int(offset)) + ' Not Aligned',
                                (w - 250, 30), font, 0.9, (0, 0, 0), 2)

                # calculate inclination
                torso_inclination_left = findAngle(
                    left_hip_x, left_hip_y, left_shoulder_x, left_shoulder_y)  # relative to verticle
                # torso_inclination_right = findAngle(right_hip_x, right_hip_y, right_shoulder_x, right_shoulder_y)

                knee_angle_left = calculate_angle(
                    (left_ankle_x, left_ankle_y), (left_knee_x, left_knee_y), (left_hip_x, left_hip_y))
                # knee_angle_right = calculate_angle((right_ankle_x, right_ankle_y), (right_knee_x, right_knee_y), (right_hip_x, right_hip_y) )
                print(torso_inclination_left, ',', knee_angle_left)

                # print(sum(torso_inclination_left+knee_angle_left))
                # identify the landmarks
                # mp_drawing.draw_landmarks(image, keypoints.pose_landmarks, mp_pose.POSE_CONNECTIONS, landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())
                # cv2.circle(img = image, center = (left_shoulder_x, left_shoulder_y), radius = 7, color = (0, 255, 255), thickness = -1)

            # # Take y - coordinate of P3 100px above x1,  for display elegance.
                # Although we are taking y = 0 while calculating angle between P1,P2,P3.
                # cv2.circle(image, (left_shoulder_x, left_shoulder_y - 100), 7, yellow, -1)
                # cv2.circle(image, (right_shoulder_x, right_shoulder_y), 7, pink, -1)
                # cv2.circle(image, (left_hip_x, left_hip_y), 7, yellow, -1)

            #     # Similarly, here we are taking y - coordinate 100px above x1. Note that
            #     # you can take any value for y, not necessarily 100 or 200 pixels.
            #     cv2.circle(image, (left_hip_x, left_hip_y - 100), 7, yellow, -1)

            # # Put text, Posture and angle inclination.
                # Text string for display.
                angle_text_string = '  Torso : ' + \
                    str(int(torso_inclination_left))
                cv2.putText(image, angle_text_string, (10, 30),
                            font, 0.9, light_green, 2)

            # # Determine whether good posture or bad posture.
                # The threshold angles have been set based on intuition.
                if torso_inclination_left < 20:
                    bad_frames = 0
                    good_frames += 1

                    cv2.putText(image, angle_text_string, (10, 30),
                                font, 0.9, light_green, 2)
                    cv2.putText(image, str(int(torso_inclination_left)),
                                (left_hip_x + 10, left_hip_y), font, 0.9, light_green, 2)

            #         # Join landmarks.
            #         cv2.line(image, (left_shoulder_x, left_shoulder_y), (left_shoulder_x, left_shoulder_y - 100), green, 4)
            #         cv2.line(image, (left_hip_x, left_hip_y), (left_shoulder_x, left_shoulder_y), green, 4)
            #         cv2.line(image, (left_hip_x, left_hip_y), (left_hip_x, left_hip_y - 100), green, 4)

                else:
                    good_frames = 0
                    bad_frames += 1

                    cv2.putText(image, angle_text_string,
                                (10, 30), font, 0.9, red, 2)
                    cv2.putText(image, (left_shoulder_x + 10,
                                left_shoulder_y), font, 0.9, red, 2)
                    cv2.putText(image, str(int(torso_inclination_left)),
                                (left_hip_x + 10, left_hip_y), font, 0.9, red, 2)

            #         # Join landmarks.
            #         cv2.line(image, (left_shoulder_x, left_shoulder_y), (left_shoulder_x, left_shoulder_y - 100), red, 4)
            #         cv2.line(image, (left_hip_x, left_hip_y), (left_shoulder_x, left_shoulder_y), red, 4)
            #         cv2.line(image, (left_hip_x, left_hip_y), (left_hip_x, left_hip_y - 100), red, 4)

                # Calculate the time of remaining in a particular posture.
                fps = 15
                good_time = (1 / fps) * good_frames
                bad_time = (1 / fps) * bad_frames
                print(good_time)

                # Pose time.
                if good_time > 0:
                    time_string_good = 'Good Posture Time : ' + \
                        str(round(good_time, 1)) + 's'
                    cv2.putText(image, time_string_good,
                                (10, h - 20), font, 0.9, green, 2)
                else:
                    time_string_bad = 'Bad Posture Time : ' + \
                        str(round(bad_time, 1)) + 's'
                    cv2.putText(image, time_string_bad,
                                (10, h - 20), font, 0.9, red, 2)

                # If you stay in bad posture for more than 3 minutes (180s) send an alert.
                # if bad_time > 3:
                #     sendWarning(image, offset, w, font, red)
            except:
                pass

            # Render detections
            mp_drawing.draw_landmarks(image, keypoints.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(
                                          color=(245, 117, 66), thickness=2, circle_radius=2),
                                      mp_drawing.DrawingSpec(
                                          color=(245, 66, 230), thickness=2, circle_radius=2)
                                      )

            # landmark_subset = keypoints.pose_landmarks(landmark = [
            #     keypoints.pose_landmarks.landmark[11],
            #     keypoints.pose_landmarks.landmark[12],
            #     keypoints.pose_landmarks.landmark[23],
            #     keypoints.pose_landmarks.landmark[24],
            # ])
            # mp_drawing.draw_landmarks(image, landmark_subset, mp_pose.POSE_CONNECTIONS,
            #                     mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2),
            #                     mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
            #                         )
            # mp_drawing.draw_landmarks(annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS, landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())

            cv2.imshow('Mediapipe Feed', image)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

            if cv2.getWindowProperty('Mediapipe Feed', 0) < 0:
                break

        cap.release()
        cv2.destroyAllWindows()