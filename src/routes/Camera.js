// import React, { useState } from 'react'
import React, { useState, useEffect, useRef, useCallback } from "react"
import { drawConnectors} from '@mediapipe/drawing_utils'
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose'
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { Container } from "@mantine/core";

function Camera() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // const textRef = useRef(null);
  // const landmarkRef = useRef(null);
  // const { height, width } = useWindowDimensions();
  const height =550;
  const width = 350;
  const [playing, setPlaying] = useState(true);
  // let playing = false

  // const startVideo = event => {
  //   setPlaying(true);
  //   console.log(playing)
  // };

  // const stopVideo = event => {
  //   setPlaying(false);
  //   console.log(playing)
  // };

  const toggleVideo = useCallback(
  () => {
    if (playing == true) {
      setPlaying(false)
    } else{
      setPlaying(true)
    }; 
  }, [playing]
  );


  function findTorso (x1, y1, x2, y2) {
    // console.log('acos', (y2 - y1)*(-y1)/(Math.sqrt((x2 - x1)**2 + (y2 - y1)**2) * y1))
    const theta = Math.acos((y2 - y1)*(-y1) /(Math.sqrt((x2 - x1)**2 + (y2 - y1)**2) * y1));
    // console.log('theta', theta)
    const degree = (180/Math.PI) * theta ;
    // console.log('torso', degree)
    return degree
  }

  function calculateAngle (a1, a2, b1, b2, c1, c2) {
    const radians = Math.atan2((c2-b2), (c1-b1)) - Math.atan2(a2-b2, a1-b1)
    // console.log('radians', radians)
    const angle = Math.abs(radians*180.0/Math.PI)
    // console.log('angle', angle)
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

    const params = {
      
      15: [115.69995802367308, 176.92575293383678], 
      20: [125.84640210966039, 172.21735754226745], 
      25: [88.89068727354515, 175.1280447087127], 
      30: [90.94999087111344, 166.2771561069063], 
      35: [104.26478783029441, 166.04326235420538], 
      40: [66.75491286859872, 135.60064258541212]};

    const datapoints = [15, 20, 25, 30, 35, 40];

    // reinitialise canvas
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
   
    console.log(typeof(torsoAngle))

    if (torsoAngle > 65 && kneeAngle < 170) {
      canvasCtx.fillText("Please straighten your back and bend your knees", 10, 100)
    };
    
    if (torsoAngle < 48 && kneeAngle > 90  && torsoAngle > 12) {

      const i = params[datapoints[Math.round(Number(torsoAngle/5))-3]];
      console.log(datapoints[Math.round(torsoAngle/5)-3]) 
      console.log(i)
      console.log(typeof(i))

      if (kneeAngle > i[0] && kneeAngle < i[1]) {
        canvasCtx.fillText("Good Posture", 10, 100)
      };
      
      if (kneeAngle > i[1]) {
        canvasCtx.fillText("Please straighten your knees", 10, 100)
      };
    };

    if (torsoAngle < 15 ) {
      canvasCtx.fillText("Please start your deadlift", 10, 100)
    };

    if (torsoAngle > 47) {
      canvasCtx.fillText("Please straighten your back", 10, 100)
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
    if (playing === false){
      return
    }

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

      // console.log(results.poseLandmarks);

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
      

      // Alignment
      const offset = calculateDistance(left_shoulder_x, left_shoulder_y, right_shoulder_x, right_shoulder_y);

      if (offset > 50) {
      
        canvasCtx.fillText("Please place the camera to the side", 10, 430);
        return
      }
      
      canvasCtx.fillText("Aligned", 10, 430);
      console.log('calculating');
      // Find the side

      try{
        if (results.poseLandmarks[23].visibility + results.poseLandmarks[11].visibility + results.poseLandmarks[25].visibility + results.poseLandmarks[27].visibility > 
          results.poseLandmarks[24].visibility + results.poseLandmarks[12].visibility + results.poseLandmarks[26].visibility + results.poseLandmarks[28].visibility){

          console.log('left');
          // left side
          const kneeAngle = calculateAngle (left_hip_x, left_hip_y, left_knee_x, left_knee_y, left_ankle_x, left_ankle_y);
          console.log('calculated knee');
          const torsoAngle = findTorso(left_hip_x, left_hip_y, left_shoulder_x, left_shoulder_y);
          console.log(kneeAngle, torsoAngle);
          // determine posture
          if (kneeAngle && torsoAngle){
            determinePosture(kneeAngle, torsoAngle)
          };

        } else {
          console.log('right');

          const kneeAngle = calculateAngle(right_hip_x, right_hip_y, right_knee_x, right_knee_y,right_ankle_x, right_ankle_y);
          console.log('calculated torso');
          const torsoAngle = findTorso(right_hip_x, right_hip_y, right_shoulder_x, right_shoulder_y);

          console.log(kneeAngle, torsoAngle);

          if (kneeAngle && torsoAngle){
            determinePosture(kneeAngle, torsoAngle)
          };

        };
      } catch (error) {
        console.error(error)
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

          console.log('playing')

          if (playing == true){
            camera.start();

          } else {

            camera.stop()
          }};
  }, 
  [playing]);

  return(
    <center>
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

        <div className = "camera_settings"
          style={{
            textAlign: "center",
            zindex: 8,
          }}>
          {/* {playing ? (<button onClick={stopVideo}>Stop</button>) : (
            <button onClick={startVideo}>Start</button>)} */}
            {/* <button onClick={startVideo}>Start</button>
            <button onClick={stopVideo}>Stop</button> */}
          <button
            onClick={toggleVideo}
          >
          {playing ? 'Stop' : 'Start'}
      </button>

        </div>

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
