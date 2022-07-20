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
import TopHeader from "../Components/TopHeader";
import styles from './styles.module.css';

function NewActivity () {
  const[opened, setOpened] = useState(true);
  const[volCheck, setVolCheck] = useState(true);

  async function openCamera(){
    await fetch('/camera')
    window.location = 'http://localhost:3000/reviewandsave'
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
      onClose={() => setOpened(false)}
      title="Audio Settings"
      >
        <Stack
        justify="center"
        spacing="xl"
        style={{marginBottom: 25}}
        >
          <Stack
          spacing="sm"
          >
            <Text
            size="sm"
            >
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
          
          <Stack
          spacing="sm"
          >
            <Text
            size="sm"
            >
              Volume
            </Text>

            <Volume/>

            </Stack>
        </Stack>
      </Modal>
    )
  };

  return (
    <>
      <div className={styles.NewActivityContainer}>
      <TopHeader header="New Activity" />

        <VidModal/>

        <Center>
          <Stack spacing={50}>
            <Button
              onClick={() => openCamera()}
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