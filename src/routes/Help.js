import React from "react"
import { Container, Text, Center, Title, Stack, UnstyledButton, Group } from "@mantine/core";
import { ChevronRight } from 'tabler-icons-react';


function Help() {
  return (
    <>
        <div>
            <Container 
                style={{marginTop:50}}
            >
                <Center>
                    <Title order={1}>Help</Title>
                </Center> 
            </Container>

            <Center>
                <Stack 
                    justify="space-around" 
                    sx={() => ({ height: 150 })}
                    align='center'
                    style={{marginTop:50}}
                    >
                    <UnstyledButton 
                        style={{width: '100%'}} 
                        onClick={() => console.log('Go to FAQ page')}
                    >
                        <Group>
                            <Text size="xl" weight='bold'>FAQ</Text>
                            <ChevronRight 
                                size={48}
                                strokeWidth={2}
                            />
                        </Group>
                    </UnstyledButton>
        
                    <UnstyledButton 
                        style={{width: '100%'}} 
                        onClick={() => console.log('Go to Contact Us page')}
                    >
                        <Group>
                            <Text size="xl" weight='bold'>Contact Us</Text>
                            <ChevronRight 
                                size={48}
                                strokeWidth={2}
                            />
                        </Group>
                    </UnstyledButton>
                </Stack>
            </Center>
        </div>
        </>
); }

  export default Help;