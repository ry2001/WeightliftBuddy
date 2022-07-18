import React from "react"
import { useLayoutEffect } from "react";
import { Container, Grid, Text, Stack, Title, Divider, Center, Image, TextInput, NumberInput, Button, Textarea, List } from "@mantine/core";
import styles from './styles.module.css';
import { Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import tempthumbnail from '../Components/tempthumbnail.jpg';


function Review(props) {


  const location = useLocation();

  const newReviewInfo = location.state
  console.log(newReviewInfo, "test")

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});


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
        <Container className={styles.ReviewSaveHeaderContainer}>

           <Stack spacing={1}> 
            <Grid>
                <Grid.Col span={3}>1/6/2022</Grid.Col>
                <Grid.Col span={4}>10:11 - 11:17</Grid.Col>
            </Grid>
            <Title order={2}> Monday Morning Lift</Title>
           </Stack>
        <Divider my="sm" />
        </Container>

        <Container>
            <Center>
            <Image radius="lg" className={styles.homeRecentImage} src={tempthumbnail}/></Center>
           
            <Grid className={styles.ReviewSaveInfoGrid} justify="center">
            <Grid.Col span={4} ><Stack align="center" spacing={1}><Title order={2}> 5 </Title> <Text size="xs"> SETS</Text> </Stack></Grid.Col>
            <Grid.Col span={4} ><Stack align="center" spacing={1}><Title order={2}> 209 </Title> <Text size="xs"> KCAL</Text></Stack></Grid.Col>
            <Grid.Col span={4} ><Stack  align="center" spacing={1}><Title order={2}> 30:20 </Title> <Text size="xs"> TIME</Text></Stack></Grid.Col>
            </Grid> 
        </Container>

        <Container className={styles.ReviewSaveSetsContainer}>
            <Title order={2}>Sets</Title>
            <Divider my="sm" />
            {newReviewInfo.map((newReviewInfo, index) => (
            <Grid key={index}>
                <Grid.Col span={2}><Title> {newReviewInfo.key}</Title></Grid.Col>
                <Grid.Col span={10}>
                <Stack spacing ={1}> 
                <Grid><Grid.Col span={4}><Title order={5}>WEIGHT:</Title></Grid.Col> 
                <Grid.Col  span={3} ><Text> {newReviewInfo.weight}</Text></Grid.Col> 
                <Grid.Col span={1}><Title order={5}>KG</Title></Grid.Col></Grid> 

                <Grid><Grid.Col span={4}><Title order={5}>REPS:</Title></Grid.Col> 
                <Grid.Col  span={3}><Text> {newReviewInfo.reps}</Text></Grid.Col></Grid> 
                </Stack> <Divider my="xs" />
                </Grid.Col>
            </Grid> 
            ))}
            <Divider my="sm" />
        </Container>

        <Container className={styles.ReviewSaveCommentsContainer}>
            <Title order={2}>Comments</Title>
            <Divider my="sm" />
            <Container className={styles.ReviewCommentTextbox} > 
            <Text className={styles.ReviewCommentText}> 
            Shag, but made good progress. yay!</Text></Container>
        </Container>

        <Container className={styles.ReviewSavePostureContainer}>
        <Title order={2}>Posture</Title>
            <Divider my="sm" />
            <Text> Feedback from our AI</Text>
            <Center>
            <Image src="https://cdn-icons-png.flaticon.com/512/3412/3412862.png"/>
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