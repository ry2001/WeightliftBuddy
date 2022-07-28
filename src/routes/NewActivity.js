import React, { useState } from "react"
import { Text, 
        Button,
        Center, 
        Stack,
        Modal,
        Slider,
        Switch} from "@mantine/core";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/Upload';
import styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

function NewActivity () {
  const[opened, setOpened] = useState(false);
  const[volCheck, setVolCheck] = useState(true);

  async function openCamera(){
    await fetch('https://weightliftbuddy.herokuapp.com/camera')
    let current_url = window.location.href
    console.log(current_url)
    let changed_url = current_url.replace("/createactivity", "/reviewandsave")
    console.log(changed_url)
    window.location = changed_url
  }

  // to be inserted, not sure where yet
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
                  openCamera();
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

  return (
    <>
      <div className={styles.NewActivityContainer}>
        <VidModal/>
        <Center>
          <Stack spacing={50}>
            <Button
              onClick={() => setOpened(true)}
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
    </>
  ); }

  export default NewActivity ;