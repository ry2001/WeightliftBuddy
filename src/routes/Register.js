import { PasswordInput, 
        TextInput, 
        Container, 
        Center,
        Button,
        Image,
        Stack} from "@mantine/core";



function Register () {
    return (
        <div>
            
            <Container
            style={{width: 300, alignItems: "center", alignContent: "center" ,marginTop:50}}
            >
                <Stack 
                spacing="sm"
                >
                    <Center>
                        <Image
                        src="https://i.pinimg.com/originals/65/45/d7/6545d7586aa48bdf487ea306d7cd853b.png"
                        radius="xl"
                        width={150}
                        />
                    </Center>
                    
                    <TextInput
                    label="Email"
                    required
                    />

                    <TextInput
                    label="Username"
                    required
                    />

                    <PasswordInput
                    label="Password"
                    required
                    />
                    
                    <TextInput
                    label="Age"
                    />
                    
                    <TextInput
                    label="Weight (kg)"
                    />

                    <TextInput
                    label="Height (cm)"
                    />

                    <TextInput
                    label="Personal Best"
                    description="Your 1 rep max!"
                    />
                    
                </Stack>

                <Center>
                    <Button 
                    style={{marginTop: 30}}
                    >
                        Register
                    </Button>
                </Center>

            </Container>
        </div>

      );
}

export default Register;