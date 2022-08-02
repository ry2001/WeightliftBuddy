// import React, { useState } from 'react'
import React, { useState, useEffect, useRef } from "react"
import { drawConnectors} from '@mediapipe/drawing_utils'
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose'
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { Text, 
  Button,
  Center, 
  Stack,
  Modal,
  Slider,
  Switch, Container} from "@mantine/core";
  import GraphicEqIcon from '@mui/icons-material/GraphicEq';

function Camera() {
  const[opened, setOpened] = useState(true);
  const[volCheck, setVolCheck] = useState(true);

  const VidModal = () => {
    const Volume = () =>{
      if (volCheck===true) {
      return(
        <Slider
          marks={[
            {value: 0, label: 'OFF'},
            {value: 50, label: "50%"},
            {value: 100, label: "100%"},
          ]}
        />
        )
      };

      return (
        <Slider
          marks={[
            {value: 0, label: 'OFF'},
            {value: 50, label: "50%"},
            {value: 100, label: "100%"},
          ]}
        disabled
        />
      )
    };
    
    return(
      <Modal
        opened={opened}
        withCloseButton={false}
        title="Audio Settings"
      >
        <Stack
          justify="center"
          spacing="xl"
          style={{marginBottom: 15}}
        >
          <Stack spacing="sm">
            <Text size="sm">
              Audio Cues
            </Text>
            <Switch
              checked={volCheck}
              onChange={() => setVolCheck(!volCheck)}
              onLabel="ON"
              offLabel="OFF"
              size="md"
            />
          </Stack>
          <Stack spacing="sm" >
            <Text size="sm">
              Volume
            </Text>
            <Volume/>
            <Center>
              <Button 
                onClick={() => {
                  setOpened(false);
                  console.log('opening camera')
                  }}
                style={{marginTop: 30}}
              >
                Confirm
              </Button>
            </Center>
          </Stack>
        </Stack>
      </Modal>
    )
  };

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // const textRef = useRef(null);
  // const landmarkRef = useRef(null);
  // const { height, width } = useWindowDimensions();
  const height =550;
  const width = 350;
  const [playing, setPlaying] = useState(false);

  function startVideo () {
    setPlaying(true);
  }
  
  function stopVideo () {
    setPlaying(false);
  }


  function findTorso (x1, y1, x2, y2){
    const theta = Math.acos((y2 - y1)*(-y1) /(Math.sqrt((x2 - x1)**2 + (y2 - y1)**2) * y1));
    const degree = (180/Math.PI) * theta ;
    return degree
  }

  function calculateAngle (a, b, c) {
    const radians = Math.atan2(c[1]-b[1], c[0]-b[0]) - Math.atan2(a[1]-b[1], a[0]-b[0])
    const angle = Math.abs(radians*180.0/Math.PI)
    if (angle > 180.0){
      const degAngle = 360-angle
      return degAngle
    }

    return angle
  }

  function calculateDistance(x1, y1, x2, y2) {
    const dist = Math.sqrt((x2-x1)**2+(y2-y1)**2)
    return dist
  }

  function determinePosture(kneeAngle, torsoAngle){
    const params = {15: (115.69995802367308, 176.92575293383678), 20: (125.84640210966039, 172.21735754226745), 25: (88.89068727354515, 175.1280447087127), 30: (90.94999087111344, 166.2771561069063), 35: (104.26478783029441, 166.04326235420538), 40: (66.75491286859872, 135.60064258541212)};
    const datapoints = [15, 20, 25, 30, 35, 40];

    // reinitialise canvas? is this neccessary?
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    // const text = textRef.current;
    // fillText(text, x, y [, maxWidth]) to draw on canvas

    if (torsoAngle > 65 && kneeAngle < 170) {
      canvasCtx.fillText("Please straighten your back and bend your knees", (10, 100))
    };
    
    if (torsoAngle > 10 && kneeAngle > 90) {
      const i = params[datapoints[Math.round(torsoAngle/5)-3]]

      if (kneeAngle > i[0] && kneeAngle < i[1]) {
        canvasCtx.fillText("Good Posture", (10, 100))
      };
      
      if (kneeAngle > i[1]) {
        canvasCtx.fillText("Please straighten your knees", (10, 100))
      };
    };

    if (torsoAngle < 15 ) {
      canvasCtx.fillText("Please start your deadlift", (10, 100))
    };

    if (torsoAngle > 65) {
      canvasCtx.fillText("Please straighten your back", (10, 100))
    };

  }

  // const connect = window.drawConnectors;
  var camera = null
                             
  function onResults(results) {

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    // const grid = new LandmarkGrid(landmarkRef);


    if (!results.poseLandmarks) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      )
    };

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx,
        results.poseLandmarks, POSE_CONNECTIONS,
        { color: '#FFFFFF', lineWidth: 2 });
      console.log(results.poseLandmarks);

      const left_shoulder_x = results.poseLandmarks[11].x * width ;
      const left_shoulder_y = results.poseLandmarks[11].y * height; 
      const right_shoulder_x = results.poseLandmarks[12].x * width ;
      const right_shoulder_y = results.poseLandmarks[12].y * height;
                
      const left_hip_x = results.poseLandmarks[23].x * width;
      const left_hip_y = results.poseLandmarks[23].y * height;
      const right_hip_x = results.poseLandmarks[24].x * width
      const right_hip_y = results.poseLandmarks[24].y * height;

          
      const left_knee_x = results.poseLandmarks[25].x * width
      const left_knee_y = results.poseLandmarks[25].y * height;
      const right_knee_x = results.poseLandmarks[26].x * width
      const right_knee_y = results.poseLandmarks[26].y * height;

      const left_ankle_x = results.poseLandmarks[27].x * width
      const left_ankle_y = results.poseLandmarks[27].y * height;
      const right_ankle_x = results.poseLandmarks[28].x * width;
      const right_ankle_y = results.poseLandmarks[28].y * height;
      console.log('calculating');

      // Alignment
      const offset = calculateDistance(left_shoulder_x, left_shoulder_y, right_shoulder_x, right_shoulder_y);
      console.log('calculated');

      if (offset > 50) {
        canvasCtx.fillText("Please place the camera to the side", 10, 430);
        return
      }
      
      canvasCtx.fillText("Aligned", 10, 430);

      // Find the side
      if (results.poseLandmarks[23].visibility + results.poseLandmarks[11].visibility + results.poseLandmarks[25].visibility + results.poseLandmarks[27].visibility > 
        results.poseLandmarks[24].visibility + results.poseLandmarks[12].visibility + results.poseLandmarks[26].visibility + results.poseLandmarks[28].visibility){

        console.log('left');
        // left side
        const kneeAngle = calculateAngle ((left_hip_x, left_hip_y), (left_knee_x, left_knee_y), (left_ankle_x, left_ankle_y))
        const torsoAngle = findTorso((left_hip_x, left_hip_y), (left_shoulder_x, left_shoulder_y))
        console.log(kneeAngle, torsoAngle)
        // determine posture
        if (kneeAngle && torsoAngle){
          determinePosture(kneeAngle, torsoAngle)
        };

      } else {
        console.log('right');

        const kneeAngle = calculateAngle((right_hip_x, right_hip_y), (right_knee_x, right_knee_y),(right_ankle_x, right_ankle_y))
        const torsoAngle = findTorso((right_hip_x, right_hip_y), (right_shoulder_x, right_shoulder_y))

        console.log(kneeAngle, torsoAngle);

        if (kneeAngle && torsoAngle){
          determinePosture(kneeAngle, torsoAngle)
        };

      };

      // removed dots as it increased latency
      // // The dots are the landmarks 
      // drawLandmarks(canvasCtx, results.poseLandmarks,
      //   { color: '#FFFFFF', lineWidth: 2, radius: 2 });
      // drawLandmarks(canvasCtx, results.poseWorldLandmarks,
      //   { color: '#FFFFFF', lineWidth: 2, radius: 2 });
      canvasCtx.restore();
    };
  }
  
  useEffect(() => {

    setPlaying(true);
    console.log()

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });  

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
      ) {
        camera = new cam.Camera(webcamRef.current.video, {
          onFrame: async () => {
            await pose.send({ image: webcamRef.current.video });
          },
          width: width,
          height: height,
        });
        camera.start();
        }
  }, 
  []);

  return(
    <center>
      <VidModal/>
      <Container>
        <div className="Camera">
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: width,
              height: height,
            }}
          />{" "}
          <canvas
            ref={canvasRef}
            className="output_canvas"
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: width,
              height: height,
            }}
          ></canvas>
        </div>
        {/* <Button
        onClick={() => setOpened(true)}
        >
          <GraphicEqIcon
              size="lg"          
          />
        </Button> */}

        <div className = "camera_settings"
          style={{
            textAlign: "center",
            zindex: 8,
          }}>
          {/* {playing ? (<button onClick={stopVideo}>Stop</button>) : (
            <button onClick={startVideo}>Start</button>)} */}
            <button onClick={startVideo}>Start</button>
            <button onClick={stopVideo}>Stop</button>
        </div>

      {/* <div className = "comments">
        <text
        ref={textRef}>
        </text>
      </div> */}
      </Container>
    </center>
  )
};

export default Camera;




// function Camera() {
//   const [playing, setPlaying] = useState(false);

// 	const HEIGHT = 500;
// 	const WIDTH = 500;


//   // start video
//   const startVideo = () => {
// 		setPlaying(true);
// 		navigator.getUserMedia(
// 			{
// 				video: true,
// 			},
// 			(stream) => {
// 				let video = document.getElementsByClassName('videoFeed')[0];
// 				if (video) {
// 					video.srcObject = stream;
// 				}
// 			},
// 			(err) => console.error(err)
// 		);
// 	};
//   // stop video
// 	const stopVideo = () => {
// 		setPlaying(false);
// 		let video = document.getElementsByClassName('videoFeed')[0];
// 		video.srcObject.getTracks()[0].stop();
// 	};

// 	return (
// 		<div className="app">
// 			<div className="app__container">
// 				<video
// 					height={HEIGHT}
// 					width={WIDTH}
// 					muted
// 					autoPlay
// 					className="videoFeed"
// 				></video>
// 			</div>
// 			<div className="app__input">
// 				{playing ? (
// 					<button onClick={stopVideo}>Stop</button>    
// 				) : (
// 					<button onClick={startVideo}>Start</button>
// 				)}
// 			</div>
// 		</div>
// 	);
// }