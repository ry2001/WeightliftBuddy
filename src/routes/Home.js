import React from "react"
import { Container, Text, Grid, Button, Center, Title, Stack, Image } from "@mantine/core";
import styles from './styles.module.css';
import tempthumbnail from '../Components/tempthumbnail.jpg';
import TopHeader from "../Components/TopHeader";


function Home() {
  const recent_dummy = {
    recentInfo: [
        {
            day: "Monday",
            date: "11/7/2022",
            title: "Monday Morning Lift",
            sets: 5,
            kcal: 235,
            time: "30:23",
            
        },

        {
            day: "Tuesday",
            date: "12/7/2022",
            title: "Tuesday Morning Lift",
            sets: 6,
            kcal: 345,
            time: "30:20",
            
        },

        {
            day: "Tuesday",
            date: "12/7/2022",
            title: "Tuesday Morning Lift",
            sets: 6,
            kcal: 345,
            time: "30:20",
            
        },

        {
            day: "Tuesday",
            date: "12/7/2022",
            title: "Tuesday Morning Lift",
            sets: 6,
            kcal: 345,
            time: "30:20",
            
        },
    ]}



  return (
    <>
      <Container>
        <TopHeader header="Home" />
        <Container className={styles.homeTopButtonsContainer}>
          <Center>
            <Grid gutter={30}>
              <Center>
                <Grid.Col span={3}><Button className={styles.homeTopButtons}>W</Button></Grid.Col>
                <Grid.Col span={3}><Button className={styles.homeTopButtons}>M</Button></Grid.Col>
                <Grid.Col span={3}><Button className={styles.homeTopButtons}>Y</Button></Grid.Col>
                <Grid.Col span={3}><Button className={styles.homeTopButtons}>All</Button></Grid.Col>
              </Center>
            </Grid>
          </Center>
        </Container >

        <Container className={styles.homeInfoContainer}>
          <Center>
            <Stack align="stretch" spacing={1} className={styles.homeInfoStack}>
              <Text align="center" > June 2022 </Text>
              <Title align="center"> 100</Title>
              <Text align="center"> MINS</Text>
              <Grid justify="center">
                <Grid.Col span={4} ><Stack align="center" spacing={1}><Title order={2}> 3</Title> <Text size="xs"> SESSIONS</Text> </Stack></Grid.Col>
                <Grid.Col span={4} ><Stack align="center" spacing={1}><Title order={2}> 110</Title> <Text size="xs"> AVG.KG</Text></Stack></Grid.Col>
                <Grid.Col span={4} ><Stack  align="center" spacing={1}><Title order={2}> 300</Title> <Text size="xs"> TOT.KG</Text></Stack></Grid.Col>
              </Grid>
            </Stack>
          </Center>
        </Container>

        <Container className={styles.homeChartContainer}>
          <Center>
            <Image src="https://cdn-icons-png.flaticon.com/512/3412/3412862.png"/>
          </Center>
        </Container>


        <Container className={styles.homeRecentContainer}>
          <Title>Recent Activity</Title>
          {recent_dummy.recentInfo.map((recentInfo, index) => (
            <Container className={styles.homeRecentIndivContainer} key={index} >
              <Grid>
                <Grid.Col className={styles.homeRecentInfoCol} span = {9}>
                  <Stack spacing={1} >
                    <Title order={4}>
                      {recentInfo.title}
                    </Title>
                    <Title order={5}>
                      {recentInfo.day} {recentInfo.date}
                    </Title>
                    <Grid>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} ><Stack align="center" spacing={1}><Title order={5}> 5</Title> <Text size="xs"> SETS</Text> </Stack></Grid.Col>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} ><Stack align="center" spacing={1}><Title order={5}> 256</Title> <Text size="xs"> KCAL</Text></Stack></Grid.Col>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} ><Stack  align="center" spacing={1}><Title order={5}> 300</Title> <Text size="xs"> TIME</Text></Stack></Grid.Col>
                    </Grid>
                  </Stack>
                </Grid.Col>
                <Grid.Col className={styles.homeRecentImageCol} span = {3}>
                  <Image radius="sm" className={styles.homeRecentImage} src={tempthumbnail}/>
                </Grid.Col>
              </Grid>
            </Container> ))}
        </Container>
        <Container className={styles.MarginforNavbar}>

        </Container >

      </Container>
    </>
  ); }

  export default Home;