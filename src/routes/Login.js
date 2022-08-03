import { useState, useEffect } from 'react';
import {Container,
        PasswordInput, 
        Text,
        Center,
        TextInput,
        Button,
        Image,
        Anchor} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';

function Login() {

    const navigate = useNavigate()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        user: "",
        password: ""
        })
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        fetch("https://weightliftbuddy.herokuapp.com/login")
        .then(response => response.json())
        .then(users => { setUsers(users) })
        .then(console.log(users));
    }, []);

    const checkLogin = () => {
        console.log(users)
        const i = users.user.findIndex(users => {return users === user;})
        if (i === -1) {
            setError({user: "User does not exist"});
        }

        else {
            const correctPassword = users.password[i];
            if (correctPassword === password){
                navigate("/home")
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
                    <Anchor component={Link} to="/register" size="sm">
                        {/* need to add route to register here */}
                        Register here
                    </Anchor>
                </Text>

                <Center>
                    <Button 
                        style={{marginTop: 30}}
                        color="orange"
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