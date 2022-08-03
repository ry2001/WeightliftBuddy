
import React, { useState, useEffect, useRef, useCallback } from "react"
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
  Switch, Container, Group, Paper} from "@mantine/core";
  import GraphicEqIcon from '@mui/icons-material/GraphicEq';
  import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
  import StopCircleIcon from '@mui/icons-material/StopCircle';
  import {useNavigate} from "react-router-dom";

function Camera() {
const navigate = useNavigate();
  ///---------------------ui stuff ------------------------
  const[opened, setOpened] = useState(false);
  const[volCheck, setVolCheck] = useState(true);
  const [error, setError] = useState("");


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


  const [playing, setPlaying] = useState(true);


  const toggleVideo = () => {
    if (playing === true) {
      setPlaying(false)
      setError("Paused")
    } else {
      setPlaying(true)
      setError("Resume")

    }; 
  }
///------------------ camera and ml stuff----------------------
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const height =550;
  const width = 350;

  function findTorso (x1, y1, x2, y2) {

    const theta = Math.acos((y2 - y1)*(-y1) /(Math.sqrt((x2 - x1)**2 + (y2 - y1)**2) * y1));
    const degree = (180/Math.PI) * theta ;
    return degree
  }

  function calculateAngle (a1, a2, b1, b2, c1, c2) {
    const radians = Math.atan2((c2-b2), (c1-b1)) - Math.atan2(a2-b2, a1-b1)
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
  
    if (torsoAngle > 65 && kneeAngle < 170) {
      // canvasCtx.fillText("Please straighten your back and bend your knees", 10, 100)
      setError("Please straighten your back and bend your knees")
    };
    
    if (torsoAngle < 48 && kneeAngle > 90  && torsoAngle > 12) {

      const i = params[datapoints[Math.round(Number(torsoAngle/5))-3]];

      if (kneeAngle > i[0] && kneeAngle < i[1]) {
        // canvasCtx.fillTextsetError("Good Posture", 10, 100)
        setError("Good Posture")
      };
      
      if (kneeAngle > i[1]) {
        // canvasCtx.fillText("Please straighten your knees", 10, 100)
        setError("Please straighten your knees")
      };
    };

    if (torsoAngle < 15 ) {
      // canvasCtx.fillText("Please start your deadlift", 10, 100)
      setError("Please start your deadlift")
    };

    if (torsoAngle > 47) {
      // canvasCtx.fillText("Please straighten your back", 10, 100)
      setError("Please straighten your back")
    };

  }

  var camera = null
                             
  function onResults(results) {

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (playing === false) {
      return;
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
      
        // canvasCtx.fillText("Please place the camera to the side", 10, 430);
        setError("Please place the camera to the side");
        return
      }
      
      // canvasCtx.fillText("Aligned", 10, 430);
      setError("Aligned")

      // Find the side
      try {
        if (results.poseLandmarks[23].visibility + results.poseLandmarks[11].visibility + results.poseLandmarks[25].visibility + results.poseLandmarks[27].visibility > 
          results.poseLandmarks[24].visibility + results.poseLandmarks[12].visibility + results.poseLandmarks[26].visibility + results.poseLandmarks[28].visibility){

          // left side
          const kneeAngle = calculateAngle (left_hip_x, left_hip_y, left_knee_x, left_knee_y, left_ankle_x, left_ankle_y);
 
          const torsoAngle = findTorso(left_hip_x, left_hip_y, left_shoulder_x, left_shoulder_y);
          // determine posture
          if (kneeAngle && torsoAngle){
            determinePosture(kneeAngle, torsoAngle)
          };

        } else {

          const kneeAngle = calculateAngle(right_hip_x, right_hip_y, right_knee_x, right_knee_y,right_ankle_x, right_ankle_y);
    
          const torsoAngle = findTorso(right_hip_x, right_hip_y, right_shoulder_x, right_shoulder_y);


          if (kneeAngle && torsoAngle){
            determinePosture(kneeAngle, torsoAngle)
          };

        };
      } catch (error) {
        console.error(error)
      };

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

      console.log(playing)

      if (playing === true){

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


            if (playing === true){
              camera.start();

            } else {
              camera.stop()
            }
          };

      } else {
        camera = null
        
        
      };
  }, 
  [playing]);

  const Toggle = () => {
    if (playing === false){
    return (
      <Group
      position="center"
      spacing="md"
      >
      <Button
      onClick={() => toggleVideo()}
      variant="subtle"
      style={{width: 120, height: 100}}
      >
        <PlayCircleFilledIcon style={{color: 'green', fontSize: 75}}/>
      </Button>

      <Button
      onClick={() => navigate('/reviewandsave')}
      >
        NEXT
      </Button>
      </Group>
    )
  } else {
    return (
      <Button
      onClick={() => toggleVideo()}
      variant="subtle"
      style={{width: 120, height: 100}}
      >
      <StopCircleIcon style={{color: 'red', fontSize: 75}}/>
      </Button>
    )
  }
  };

  const Skeleton = () => {
    if (playing === true) {
    return (
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
    )
    }
    return ;
  }

  return(
    <div>
      <VidModal/>
      <Stack
      spacing={0}
      >
        <Group
        position='right'
        style={{marginTop: 5, marginRight: 5}}
        >
          <Button
          onClick={() => setOpened(true)}
          size="md"
          variant="subtle"
          >
            <GraphicEqIcon
                size="lg"          
            />
          </Button>
        </Group>

        <Container
        style={{height: 550, width: 350}}
        >
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
          <Skeleton/>
        </Container>
        <Center>
          <Paper shadow="xs" p="sm" withBorder style={{width: 300, height: 50}}>
            <Text align="center">
              {error}
            </Text>
          </Paper>
        </Center>
        <Group
        position="center">
          <Toggle/>
        </Group>
       
      </Stack>
    </div>
  )
};

export default Camera;


