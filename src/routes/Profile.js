import React from "react"
import { Container, Text, Image, Center, Grid, Button } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Profile() {

  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
  }
  const data = {
    name: "Anya Forger",
    age: 6,
    email: 'anya_forger@gmail.com',
    height: '99.6 cm',
    weight: '16 kg',
    rm: '5 kg'
  }

  return (
    <>
    <Container className={styles.SettingsContainer}>
      <div>
        <Container 
          style={{marginTop:50}}
        > 
        </Container>

        <Container 
          style={{marginTop:100}}
        >
          <Center>
            <Image
              width={200}
              height={200}
              fit='contain'
              radius="lg"
              src="https://daxstreet.com/wp-content/uploads/2022/05/Anya-Forger.jpg"
            />
          </Center> 
        </Container>

        <Container style={{marginTop:50}}>
          <Grid>
            <Grid.Col span={6} align='right'>
              <Text weight='bold'>Username:</Text>
              <Text weight='bold'>Age:</Text>
              <Text weight='bold'>Email:</Text>
              <Text weight='bold'>Height:</Text>
              <Text weight='bold'>Weight:</Text>
              <Text weight='bold'>1RM:</Text>
            </Grid.Col>

            <Grid.Col span={6} align='left'>
              <Text>{data.name}</Text>
              <Text>{data.age}</Text>
              <Text>{data.email}</Text>
              <Text>{data.height}</Text>
              <Text>{data.weight}</Text>
              <Text>{data.rm}</Text>
            </Grid.Col>
          </Grid>
        </Container>

        <Container style={{marginTop:50}}>
          <Center>
            <Button onClick={ logout }>Logout</Button>
          </Center> 
        </Container>
      </div>
      </Container>
    </>
  ); }

  export default Profile;