import React from "react"
import { useLayoutEffect } from "react";
import { Container, Text, Grid, Button, Center, Title, Stack, Image } from "@mantine/core";
import styles from './styles.module.css';
import { useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import tempthumbnail from '../Components/tempthumbnail.jpg';
import thumbnailabby from '../Components/thumbnailabby.jpg';
import { Link } from "react-router-dom";
import BarChart from "../Components/BarChart";


function Home() {

  useLayoutEffect(() => {
    window.scrollTo(0, 0) });

  // const location = useLocation();

  // const newReviewInfo = location.state.sets
  // const newComment = location.state.comment
  // const navigate = useNavigate();


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
      <Container className={styles.homeContainer}>
        <Container className={styles.homeTopButtonsContainer}>
          <Center>
            <Grid gutter={30}>
              <Center>
                <Grid.Col span={3}>
                  <Button className={styles.homeTopButtons}>W</Button>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Button className={styles.homeTopButtons}>M</Button>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Button className={styles.homeTopButtons}>Y</Button>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Button className={styles.homeTopButtons}>All</Button>
                </Grid.Col>
              </Center>
            </Grid>
          </Center>
        </Container >

        <Container className={styles.homeInfoContainer}>
          <Center>
            <Stack align="stretch" spacing={1} className={styles.homeInfoStack}>
              <Text align="center" className={styles.homeInfoTexts}> JULY 2022 </Text>
              <Title align="center" className={styles.homeInfoTitleMinsText}> 100</Title>
              <Text align="center" className={styles.homeInfoTexts}> MINS</Text>
              <Grid justify="center">
                <Grid.Col span={4} >
                  <Stack align="center" spacing={1}>
                    <Title order={2} className={styles.homeInfoTitleTexts}> 3</Title> 
                    <Text className={styles.homeInfoTexts}> SESSIONS</Text> 
                  </Stack>
                </Grid.Col>
                <Grid.Col span={4} >
                  <Stack align="center" spacing={1}>
                    <Title order={2} className={styles.homeInfoTitleTexts}> 110</Title> 
                    <Text  className={styles.homeInfoTexts}> AVG.KG</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={4} >
                  <Stack  align="center" spacing={1}>
                    <Title order={2} className={styles.homeInfoTitleTexts}> 300</Title> 
                    <Text className={styles.homeInfoTexts}> TOT.KG</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Center>
        </Container>

        <Container className={styles.homeChartContainer}>
          <Center>
            <Image src="https://cdn-icons-png.flaticon.com/512/3412/3412862.png"/>
            <BarChart/>
          </Center>
        </Container>

        <Container className={styles.homeRecentContainer}>
          <Title className={styles.homeTitles}>Recent Activity</Title>

          {/* <Link to="/reviewdummy" className={styles.RestyleLink}>
          <Container className={styles.homeRecentIndivContainer}>
              <Grid>
                <Grid.Col className={styles.homeRecentInfoCol} span = {9}>
                  <Stack spacing={1} >
                    <Title order={4}>
                      Monday Afternoon Lift
                    </Title>
                    <Title order={5}>
                      Monday 25/7/2022
                    </Title>
                    <Grid>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack align="center" spacing={1}>
                          <Title order={5}> 5</Title> 
                          <Text size="xs"> SETS</Text> 
                        </Stack>
                      </Grid.Col>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack align="center" spacing={1}>
                          <Title order={5}> 256</Title> 
                          <Text size="xs"> KCAL</Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack  align="center" spacing={1}>
                          <Title order={5}> 67:20</Title> 
                          <Text size="xs"> TIME</Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Stack>
                </Grid.Col>
                <Grid.Col className={styles.homeRecentImageCol} span = {3}>
                  <Image radius="sm" className={styles.homeRecentImage} src={thumbnailabby}/>
                </Grid.Col>
              </Grid>
            </Container></Link> */}




          {recent_dummy.recentInfo.map((recentInfo, index) => (
            <Link to="/reviewdummy" className={styles.RestyleLink}>
            <Container className={styles.homeRecentIndivContainer} key={index} >
              <Grid>
                <Grid.Col className={styles.homeRecentInfoCol} span = {9}>
                  <Stack spacing={1} >
                    <Title className={styles.homeRecentIndivStatTitle} order={4}>
                      {recentInfo.title}
                    </Title>
                    <Title className={styles.homeRecentIndivSubTitle} order={5}>
                      {recentInfo.day} {recentInfo.date}
                    </Title>
                    <Grid>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack align="center" spacing={1}>
                          <Title className={styles.homeRecentIndivStatText} order={5}> {recentInfo.sets}</Title> 
                          <Text  className={styles.homeRecentIndivStatType} size="xs"> SETS</Text> 
                        </Stack>
                      </Grid.Col>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack align="center" spacing={1}>
                          <Title  className={styles.homeRecentIndivStatText} order={5}> {recentInfo.kcal}</Title> 
                          <Text className={styles.homeRecentIndivStatType} size="xs"> KCAL</Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack  align="center" spacing={1}>
                          <Title className={styles.homeRecentIndivStatText} order={5}> {recentInfo.time}</Title> 
                          <Text className={styles.homeRecentIndivStatType} size="xs"> TIME</Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Stack>
                </Grid.Col>
                <Grid.Col className={styles.homeRecentImageCol} span = {3}>
                  <Image radius="sm" className={styles.homeRecentImage} src={tempthumbnail}/>
                </Grid.Col>
              </Grid>
            </Container></Link> ))}
        </Container>
        <Container className={styles.MarginforNavbar}>

        </Container >

      </Container>
  ); }

  export default Home;