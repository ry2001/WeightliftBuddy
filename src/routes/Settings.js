import React from "react"
import { Container, Text, Title, Center, UnstyledButton, Autocomplete, Group, Stack, Button } from "@mantine/core";
import { Search, AlertCircle, Help, Eye, Pokeball, ChevronRight } from 'tabler-icons-react';


function Settings() {
  return (
    <>
      <div>
          <Container 
            style={{marginTop:50}}
          >
            <Center>
              <Title order={1}>Setting</Title>
            </Center> 
          </Container>

          {/* actually idk why we need a search bar since we only have three settings*/}
          <Container 
            style={{marginTop:50}}
          >
            <Center>
            <Autocomplete 
              icon={<Search />}
              placeholder="Search for a setting"
              data={['Display', 'Help', 'About']}
            />
            </Center> 
          </Container>
            
          {/* This is not aligned properly, due to different description length */}
          <Stack 
            justify="space-around" 
            sx={() => ({ height: 300 })}
            align='center'
            style={{marginTop:50}}
            >
              <UnstyledButton 
                // style={{width: '100%'}} 
                onClick={() => console.log('Go to Display page')}
              >
                <Group>
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

              <UnstyledButton 
                // style={{width: '100%'}} 
                onClick={() => console.log('Go to Help page')}
              >
                <Group>
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

              <UnstyledButton 
                // style={{width: '100%'}}
                onClick={() => console.log('Go to About page')}
              >
                <Group>
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
          </Stack>
      </div>
      </>
  ); }

  export default Settings;