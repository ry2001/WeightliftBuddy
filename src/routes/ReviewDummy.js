import React from "react"
import { useLayoutEffect } from "react";
import { Container, Grid, Text, Stack, Title, Divider, Center, Image, List } from "@mantine/core";
import styles from './styles.module.css';
import tempthumbnail from '../Components/tempthumbnail.jpg';
import thumbnailabby from '../Components/thumbnailabby.jpg';
import TopHeader from "../Components/TopHeader";
import { Link } from "react-router-dom";
import PieChart from "../Components/PieChart";

function ReviewDummy() {
 
  useLayoutEffect(() => {
    window.scrollTo(0, 0) });

  const review_dummy = {
    reviewInfo: [
        {
          id: 1,
          weight: 50, 
          reps: 10,
            
        },

        {
          id: 2,
          weight: 55, 
          reps: 5,
            
        },

        {
          id: 3,
          weight: 55, 
          reps: 5,
            
        },

        {
          id: 4,
          weight: 60, 
          reps: 3,
            
        },

        {
          id: 5,
          weight: 60, 
          reps: 3,
            
        },

        
    ]}


  return (
    <>
      <Container className={styles.ReviewSaveContainer}> 
        <Container className={styles.ReviewSaveHeaderContainer}>
          <Stack spacing={1}> 
            <Grid>
            <Grid.Col span={4} ><Text className={styles.ReviewDateText}>25/7/2022</Text></Grid.Col>
            <Grid.Col span={5}><Text  className={styles.ReviewDateText}>12:11 - 13:17</Text></Grid.Col>
            </Grid>
            <Title order={2} className={styles.ReviewTitle}> Monday Afternoon Lift</Title>
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
                <Title className={styles.ReviewInfoText} order={2}> 5 </Title> 
                <Text className={styles.ReviewInfoType} size="xs"> SETS</Text> 
              </Stack>
            </Grid.Col>
            <Grid.Col span={4} >
              <Stack align="center" spacing={1}>
                <Title className={styles.ReviewInfoText} order={2}> 256 </Title> 
                <Text  className={styles.ReviewInfoType} size="xs"> KCAL</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4} >
              <Stack  align="center" spacing={1}>
                <Title className={styles.ReviewInfoText} order={2}> 67:20 </Title> 
                <Text className={styles.ReviewInfoType} size="xs"> TIME</Text>
              </Stack>
            </Grid.Col>
          </Grid> 
        </Container>


        <Container className={styles.ReviewSavePostureContainer}>
          <Title order={2}>Posture</Title>
          <Divider my="sm" />
          <Text  className={styles.ReviewInfoType}> Feedback from our AI</Text>
          <Center>
            <PieChart/>
          </Center>
          <Title className={styles.ReviewInfoText} order={3}> Issues: </Title>
          <List>
            <List.Item  className={styles.ReviewInfoType}>Back was not straight</List.Item>
            <List.Item  className={styles.ReviewInfoType}>Arms were bent</List.Item>
          </List>
          <Divider my="sm" />
        </Container>

        <Container className={styles.ReviewSaveSetsContainer}>
          <Title className={styles.ReviewInfoText} order={2}>Sets</Title>
          <Divider my="sm" />
          {review_dummy.reviewInfo.map((reviewInfo, index) => (
            <Grid>
              <Grid.Col span={2}>
                <Title> {reviewInfo.id}</Title>
              </Grid.Col>
              <Grid.Col span={10}>
                <Stack spacing ={1}> 
                  <Grid>
                    <Grid.Col span={4}>
                      <Title order={5}>WEIGHT:</Title>
                    </Grid.Col> 
                    <Grid.Col  span={3} >
                      <Text> {reviewInfo.weight}</Text>
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
                      <Text> {reviewInfo.reps}</Text>
                    </Grid.Col>
                  </Grid> 
                </Stack>
              </Grid.Col>
            </Grid> ))}
          <Divider my="sm" />
        </Container>

        <Container className={styles.ReviewSaveCommentsContainer}>
          <Title className={styles.ReviewInfoText} order={2}>Comments</Title>
          <Divider my="sm" />
          <Container className={styles.ReviewCommentTextbox} > 
            <Text className={styles.ReviewCommentText}> 
              tired but happy with my progress! a lot of improvement on form too!!
            </Text>
          </Container>
        </Container>

        
      </Container>
    </>
  ); }

  export default ReviewDummy;