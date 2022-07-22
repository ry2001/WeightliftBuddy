import React from "react"
import { Container, Text, Center, UnstyledButton, Autocomplete, Group, Stack } from "@mantine/core";
import { Search, AlertCircle, Help, Eye, ChevronRight } from 'tabler-icons-react';
import TopHeader from "../Components/TopHeader";
import { Link } from "react-router-dom";


function Settings() {
  return (
    <>
      <div>
        <Container 
          style={{marginTop:50}}
        >
          <TopHeader header="Setting" /> 
        </Container>

        <Container 
          style={{marginTop:100}}
        >
          <Center>
            <Autocomplete 
              icon={<Search />}
              placeholder="Search for a setting"
              data={['Display', 'Help', 'About']}
            />
          </Center> 
        </Container>

        <Center>
          <Stack 
            justify="space-around" 
            sx={() => ({ height: 300 })}
            style={{marginTop:50}}
          > 
          <Link to ="/display">
            <UnstyledButton 
              style={{width: '100%'}} 
              onClick={() => console.log('Go to Display page')}
            >
              <Group position="apart" >
                <Eye 
                  size={48}
                  strokeWidth={2}
                />
                <div>
                  <Text>Display</Text>
                  <Text size="xs" color="gray">Change display settings</Text>
                </div>
                <ChevronRight 
                  size={48}
                  strokeWidth={2}
                />
              </Group>
              </UnstyledButton> 
            </Link>
            <Link to ="/help">
              <UnstyledButton 
                style={{width: '100%'}} 
                onClick={() => console.log('Go to Help page')}
              >
                <Group position="apart" >
                  <Help 
                    size={48}
                    strokeWidth={2}
                  />
                  <div>
                    <Text>Help</Text>
                    <Text size="xs" color="gray">Go to help page</Text>
                  </div>
                  <ChevronRight 
                    size={48}
                    strokeWidth={2}
                  />
                </Group>
              </UnstyledButton> 
            </Link>
            <Link to ="/about">
              <UnstyledButton 
                style={{width: '100%'}}
                onClick={() => console.log('Go to About page')}
              >
                <Group position="apart" >
                  <AlertCircle 
                    size={48}
                    strokeWidth={2}
                  />
                  <div>
                    <Text>About</Text>
                    <Text size="xs" color="gray">Go to about page</Text>
                  </div>
                  <ChevronRight 
                    size={48}
                    strokeWidth={2}
                  />
                </Group>
              </UnstyledButton>
            </Link>
          </Stack>
        </Center>
      </div>
    </>
  ); }

  export default Settings;