import React from "react"
import { Text, 
        Button,
        Center, 
        Stack} from "@mantine/core";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/Upload';
import TopHeader from "../Components/TopHeader";
import styles from './styles.module.css';

function NewActivity () {

  function openCamera(){
    fetch("/camera")
  }

  return (
    <>
      <div className={styles.NewActivityContainer}>
      <TopHeader header="New Activity" />

        <Center>
          <Stack
          spacing={50}
          >
            <Button
            onClick={() => openCamera()}
            variant="light"
            style={{width: 200, height: 150}}
            color="dark"
            >
              <Stack
              spacing="0"
              >
                <CameraAltIcon
                sx={{fontSize:100}}
                />
                <Text
                color="dimmed"
                >
                  Take a Video
                </Text>
              </Stack>
            </Button>

            <Button
            variant="light"
            style={{width: 200, height: 150}}
            color="dark"
            >
              <Stack
              spacing="0"
              >
                <UploadIcon
                sx={{fontSize:100}}
                />

                <Text
                color="dimmed"
                >
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