import React from "react"
import { Container, Grid, Text, Stack, Title, Divider, Center, Image, List } from "@mantine/core";
import styles from './styles.module.css';
import tempthumbnail from '../Components/tempthumbnail.jpg';
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import PieChart from "../Components/PieChart";
import thumbnailabby from '../Components/thumbnailabby.jpg';
import { AppShell, Navbar, Header, Aside, Footer } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Review() {

  const location = useLocation();
  const navigate = useNavigate();

  const newReviewInfo = location.state.sets
  const newComment = location.state.comment

  console.log(newReviewInfo, "test")
  console.log(newComment, "comment")

  useLayoutEffect(() => {
    window.scrollTo(0, 0) });



  const review_dummy = {
    reviewInfo: [
        {
           id: 1,
           weight: 60, 
           reps: 6,
            
        },

        {
          id: 2,
          weight: 60, 
          reps: 6,
            
        },

        {
          id: 3,
          weight: 65, 
          reps: 5,
            
        },

        {
          id: 4,
          weight: 70, 
          reps: 3,
            
        },

        {
          id: 5,
          weight: 70, 
          reps: 3,
            
        },

        
    ]}


  return (
    <>
      <Container> 
        <AppShell
          header={
            <Header fixed position={{ top: 0, left: 0, right:0}} 
                    className={styles.TopHeader} 
            > 
            <Grid justify="space-around">
              <Grid.Col span={1}>
                <Center>
                  <ArrowBackIcon
                    onClick={() => navigate('/home')}
                    size='lg'
                    style={{marginTop: 10}}
                  />
                </Center>
              </Grid.Col>
              <Grid.Col span={4}>
                <Title>
                  Review
                </Title>
              </Grid.Col>
              <Grid.Col span={1}>
                <Center>
                  <FontAwesomeIcon  
                    size="lg" 
                    icon={faPen}
                    style={{marginTop: 10}}
                  />
                </Center>
              </Grid.Col>
            </Grid>
          </Header>}>
        </AppShell>

        <Container className={styles.ReviewSaveHeaderContainer}>
          <Stack spacing={1}> 
            <Grid>
              <Grid.Col span={3}>25/7/2022</Grid.Col>
              <Grid.Col span={4}>12:11 - 13:17</Grid.Col>
            </Grid>
            <Title order={2}> Monday Afternoon Lift</Title>
          </Stack>
          <Divider my="sm" />
        </Container>

        <Container>
          <Center>
            <Image radius="lg" className={styles.homeRecentImage} src={thumbnailabby}/>
          </Center>
          <Grid className={styles.ReviewSaveInfoGrid} justify="center">
            <Grid.Col span={4} >
              <Stack align="center" spacing={1}>
                <Title order={2}> 5 </Title> 
                <Text size="xs"> SETS</Text> 
              </Stack>
            </Grid.Col>
            <Grid.Col span={4} >
              <Stack align="center" spacing={1}>
                <Title order={2}> 209 </Title> 
                <Text size="xs"> KCAL</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4} >
              <Stack  align="center" spacing={1}>
                <Title order={2}> 67:20 </Title> 
                <Text size="xs"> TIME</Text>
              </Stack>
            </Grid.Col>
          </Grid> 
        </Container>

        <Container className={styles.ReviewSaveSetsContainer}>
          <Title order={2}>Sets</Title>
          <Divider my="sm" />
          {newReviewInfo.map((newReviewInfo, index) => (
            <Grid>
              <Grid.Col span={2}>
                <Title> {newReviewInfo.id}</Title>
              </Grid.Col>
              <Grid.Col span={10}>
                <Stack spacing ={1}> 
                  <Grid>
                    <Grid.Col span={4}>
                      <Title order={5}>WEIGHT:</Title>
                    </Grid.Col> 
                    <Grid.Col  span={3} >
                      <Text> {newReviewInfo.weight}</Text>
                    </Grid.Col> 
                    <Grid.Col span={1}>
                      <Title order={5}>KG</Title>
                    </Grid.Col>
                  </Grid> 

                  <Grid>
                    <Grid.Col span={4}>
                      <Title order={5}>REPS:</Title>
                    </Grid.Col> 
                    <Grid.Col  span={3}>
                      <Text> {newReviewInfo.reps}</Text>
                    </Grid.Col>
                  </Grid> 
                </Stack>
              </Grid.Col>
            </Grid> ))}
          <Divider my="sm" />
        </Container>

        <Container className={styles.ReviewSaveCommentsContainer}>
          <Title order={2}>Comments</Title>
          <Divider my="sm" />
          <Container className={styles.ReviewCommentTextbox} > 
            <Text className={styles.ReviewCommentText}> 
              {newComment}
            </Text> 
          </Container>
        </Container>

        <Container className={styles.ReviewSavePostureContainer}>
          <Title order={2}>Posture</Title>
          <Divider my="sm" />
          <Text> Feedback from our AI</Text>
          <Center>
            <PieChart/>
          </Center>
          <Title order={3}> Issues: </Title>
          <List>
            <List.Item>Back was not straight</List.Item>
            <List.Item>Arms were bent</List.Item>
          </List>
          <Divider my="sm" />
        </Container>
      </Container>
    </>
  ); }

  export default Review;