import React from "react"
import { useLayoutEffect } from "react";
import { Container, Text, Grid, Title, Stack, Image } from "@mantine/core";
import styles from './styles.module.css';
import tempthumbnail from '../Components/tempthumbnail.jpg';
import thumbnailabby from '../Components/thumbnailabby.jpg';
import { Link } from "react-router-dom";

function History() {

  useLayoutEffect(() => {
    window.scrollTo(0, 0) });

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
    ]}



  return (
    <>
      <Container>
        <Container className={styles.HistoryContainer}>
          <Title order={3}>This Week</Title>

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
                          <Title order={5}> 67:20 </Title> 
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
            </Container>



          {recent_dummy.recentInfo.map((recentInfo, index) => (
            <Link to="/reviewdummy" className={styles.RestyleLink}>
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
                        <Grid.Col className={styles.homeRecentIndivStat} span={2}>
                          <Stack align="center" spacing={1}>
                            <Title order={5}> {recentInfo.sets}</Title> 
                            <Text size="xs"> SETS</Text> 
                          </Stack>
                        </Grid.Col>
                        <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                          <Stack align="center" spacing={1}>
                            <Title order={5}> {recentInfo.kcal}</Title>
                            <Text size="xs"> KCAL</Text>
                          </Stack>
                        </Grid.Col>
                        <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                          <Stack  align="center" spacing={1}>
                            <Title order={5}> {recentInfo.time}</Title>
                            <Text size="xs"> TIME</Text>
                          </Stack>
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col className={styles.homeRecentImageCol} span = {3}>
                    <Image radius="sm" className={styles.homeRecentImage} src={tempthumbnail}/>
                  </Grid.Col>
                </Grid>
            </Container>
          </Link> ))}
        </Container>

        <Container className={styles.homeRecentContainer}>
          <Title order={3}>Last Week</Title>
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
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack align="center" spacing={1}>
                          <Title order={5}> {recentInfo.sets}</Title> 
                          <Text size="xs"> SETS</Text> 
                        </Stack>
                      </Grid.Col>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack align="center" spacing={1}>
                          <Title order={5}> {recentInfo.kcal}</Title> 
                          <Text size="xs"> KCAL</Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col className={styles.homeRecentIndivStat} span={2} >
                        <Stack  align="center" spacing={1}>
                          <Title order={5}> {recentInfo.time}</Title> 
                          <Text size="xs"> TIME</Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Stack>
                </Grid.Col>
                <Grid.Col className={styles.homeRecentImageCol} span = {3}>
                  <Image radius="sm" className={styles.homeRecentImage} src={tempthumbnail}/>
                </Grid.Col>
              </Grid>
            </Container> ))}
        </Container>

        <Container className={styles.homeRecentContainer}>
          <Title order={3}>Last Month</Title>
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
                          <Title order={5}> 300</Title> 
                          <Text size="xs"> TIME</Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Stack>
                </Grid.Col>
                <Grid.Col className={styles.homeRecentImageCol} span = {3}>
                  <Image radius="sm" className={styles.homeRecentImage} src={tempthumbnail}/>
                </Grid.Col>
              </Grid>
            </Container> ))}
        </Container>
      </Container>

      <Container className={styles.MarginforNavbar} />
    </>
  ); }

  export default History;