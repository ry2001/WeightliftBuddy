// import React, { useState } from 'react'
import React, { useEffect, useRef } from "react"
import { drawConnectors} from '@mediapipe/drawing_utils'
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose'
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

function Camera() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // const landmarkRef = useRef(null);

  const connect = window.drawConnectors;

  var camera = null;

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
          width: 400,
          height: 400,
        });
        camera.start();
        }
  }, 
  []);

  return(
    <center>
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
            width: 400,
            height: 400,
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
            width: 400,
            height: 400,
          }}
        ></canvas>
      </div>
      <button>
          Start
        </button>
        <button>
          Stop
        </button>
    </center>

  )
};




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


export default Camera;

// ReactDOM.render(<WebcamStreamCapture />, document.getElementById("root"));

// function onResults(results) {
//   const videoWidth = webcamRef.current.video.videoWidth
//   const videoHeight = webcamRef.current.video.videoHeight

//   canvasRef.current.width = videoWidth
//   canvasRef.current.height = videoHeight
//   const canvasElement = canvasRef.current
//   const canvasCtx = canvasElement.getContext("2d")

//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
//   canvasCtx.drawImage(
//     results.image,
//     0,
//     0,
//     canvasElement.width,
//     canvasElement.height
//   );
  
//   // Only overwrite existing pixels.
//   canvasCtx.globalCompositeOperation = 'source-in';
//   canvasCtx.fillStyle = '#00000';
//   canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

//   // Only overwrite missing pixels.
//   canvasCtx.globalCompositeOperation = 'destination-atop';
//   canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

//   canvasCtx.globalCompositeOperation = 'source-over';
//   connect(canvasCtx, results.poseLandmarks, {color: '#00FF00', lineWidth: 4});

//   canvasCtx.restore();
// }

// const MPPoseDetection = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const poseDetection = new poseDetection({
//       locateFile: (file) => {
//         console.log(`${file}`);
//         return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}/${file}`;
//       }
//     })
//     poseDetection.setOptions({
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     })
//     poseDetection.onResults(onResults);
//     camera.start();
//   })

// }

// const camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await poseDetection.send({image: videoElement});
//   },
//   width: 1280,
//   height: 720
// });
