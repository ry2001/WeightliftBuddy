import { PasswordInput, 
        TextInput, 
        Container, 
        Center,
        Button,
        Image,
        Stack,
        } from "@mantine/core";
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

function Register () {

    const navigate = useNavigate()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeUser(e) {
        setUser(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    const register = () => {
        fetch('https://weightliftbuddy.herokuapp.com/register', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
                password: password,
            })
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        navigate("/login")
    }

    return (
        <div>
            <Container
                style={{width: 300, alignItems: "center", alignContent: "center" ,marginTop:70}}
            >
                <Stack 
                spacing="sm"
                style={{marginTop: 30}}
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
                        onChange={handleChangeUser}
                    />

                    <PasswordInput
                        label="Password"
                        required
                        onChange={handleChangePassword}
                    />
                    
                    <TextInput label="Age"/>
                    
                    <TextInput label="Weight (kg)"/>

                    <TextInput label="Height (cm)"/>

                    <TextInput
                        label="Personal Best"
                        description="Your 1 rep max!"
                    />
                </Stack>

                <Center>
                    <Button 
                        style={{marginTop: 30}}
                        onClick={register}
                    >
                        Register
                    </Button>
                </Center>
            </Container>
        </div>
    ); }

export default Register;