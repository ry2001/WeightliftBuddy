import React from "react"
import { Container, Text, Center, UnstyledButton, Autocomplete, Group, Stack } from "@mantine/core";
import { Search, AlertCircle, Help, Eye, ChevronRight } from 'tabler-icons-react';
import { Link } from "react-router-dom";
import styles from './styles.module.css';

function Settings() {
  return (
    <>
    <Container className={styles.SettingsContainer}>
      <div>
        <Container 
          style={{marginTop:50}}
        >
        </Container>
        
        <Center>
          <Autocomplete 
            icon={<Search />}
            placeholder="Search for a setting"
            data={['Display', 'Help', 'About']}
          />
        </Center> 

        <Center>
          <Stack 
            justify="space-around" 
            sx={() => ({ height: 300 })}
            style={{marginTop:50}}
          > 
          <Link to ="/display">
            <UnstyledButton 
              className={styles.IndividualSettingsContainer}
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
                className={styles.IndividualSettingsContainer}
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
                className={styles.IndividualSettingsContainer}
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
      </Container>
    </>
  ); }

  export default Settings;