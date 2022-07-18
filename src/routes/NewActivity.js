import React, { useState, useEffect } from "react"
import { Text, 
        Button,
        Center, 
        Stack} from "@mantine/core";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/Upload';

function NewActivity () {

  function openCamera(){
    fetch("/camera")
  }

  // this is not working
  function close(){
    fetch("/createactivity")
}

  return (
    <>
      <div>
          <Button
            onClick={() => close()}
            variant="light"
            style={{width: 200, height: 150}}
            color="dark"
            />
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