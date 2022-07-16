import { useState } from 'react';
import {Container, PasswordInput, Card,
        Text,
        Center,
        TextInput,
        Button,
        Image,
        Anchor} from '@mantine/core';

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        user: "",
        password: ""
})

    const validUsers = [
        {user: 'kaywee', password: '1234'},
        {user: 'valu', password: 'abc'}
    ]

    const checkLogin = () => {
        const i = validUsers.findIndex(object => {
            return object.user === user;})
        console.log(i)
        if (i === -1) {
            setError({user: "User does not exist"});
        }

        else {
            const correctPassword = validUsers[i].password;
            console.log(correctPassword);
            if (correctPassword === password){
                setError({password:"success"})
                // navigate next page
            }
            else {
            setError({password: "Incorrect password"})
            }
        }
    }


    return ( 
        <div>

            <Container
            style={{width: 300, alignItems: "center", alignContent: "center" ,marginTop:50}}
            >
                {/* add logo */}
                <Center>
                    <Image
                    width={200}
                    src="https://cdn-icons-png.flaticon.com/512/3412/3412862.png"
                    />
                </Center>

                <TextInput
                label="Username/Email"
                placeholder='xxx@gmail.com'
                onChange={(event) => setUser(event.currentTarget.value)}
                />

                <Text 
                color="red" 
                size="xs" 
                style={{marginBottom: 10}}
                >
                    {error.user}
                </Text>

                <PasswordInput 
                placeholder='Password'
                label='Password'
                size='sm'
                value={password} 
                onChange={(event) => setPassword(event.currentTarget.value)} 
                />

                <Text
                color="red" 
                size="xs" 
                style={{marginBottom: 10}}
                >
                    {error.password}
                </Text>

                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor href="#" size="sm">
                        {/* need to add route to register here */}
                        Register here
                    </Anchor>
                </Text>
                
                <Center>
                    <Button 
                    style={{marginTop: 30}}
                    onClick={checkLogin}
                    >
                        Login
                    </Button>
                </Center>

            </Container>
        
        </div>

     );
}

export default Login;