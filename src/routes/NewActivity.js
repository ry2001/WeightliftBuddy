import React, { useState } from "react"
import { Text, 
        Button,
        Center, 
        Stack,
        Modal,
        Slider,
        Switch, Container} from "@mantine/core";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/Upload';
import styles from './styles.module.css';
import { Link, useNavigate } from "react-router-dom";

function NewActivity () {
  const navigate = useNavigate();

  function openCamera(){
    return(
    console.log('enter')
    // await fetch('/camera')
    // window.location = 'http://localhost:3000/reviewandsave'
    )
  };
  // async function openCamera(){
  //   await fetch('https://weightliftbuddy.herokuapp.com/camera')
  //   let current_url = window.location.href
  //   let changed_url = current_url.replace("/createactivity", "/reviewandsave")
  //   window.location = changed_url
  // }

  // to be inserted, not sure where yet

  return (
    <Container className={styles.NewActivityContainer}>
      <div >
        <Center>
          <Stack spacing={50}>
            <Button 
              className={styles.NewActivityButtons}
              onClick={() => navigate('/camera')}
              variant="light"
              style={{width: 200, height: 150}}
              color="dark"
            >
              <Stack spacing="0">
                <CameraAltIcon sx={{fontSize:100}}/>
                <Text color="dimmed">
                  Take a Video
                </Text>
              </Stack>
            </Button>

            <Button
              className={styles.NewActivityButtons}
              variant="light"
              style={{width: 200, height: 150}}
              color="dark"
            >
              <Stack spacing="0">
                <UploadIcon sx={{fontSize:100}}/>
                <Text color="dimmed">
                  Upload
                </Text>
              </Stack>
            </Button>
          </Stack>
        </Center>
      </div>
      </Container>

  ); }

  export default NewActivity ;