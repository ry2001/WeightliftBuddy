import React from "react"
import { useState} from "react";
import { Container, Grid, Text, Stack, Title, Divider, Center, Image, NumberInput, Button, Textarea, List } from "@mantine/core";
import styles from './styles.module.css';
import { useNavigate} from "react-router-dom";
import tempthumbnail from '../Components/tempthumbnail.jpg';
import TopHeader from "../Components/TopHeader";
import PieChart from "../Components/PieChart";
import { AppShell, Navbar, Header, Aside, Footer } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faUserCircle, faGear, faClock, faPlusCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";



function EditReview() {

  const review_dummy = {
    reviewInfo: [
        {
           weight: 60, 
           reps: 6,
            
        },

        {
          weight: 60, 
          reps: 6,
            
        },

        {
          weight: 65, 
          reps: 5,
            
        },

        {
          weight: 70, 
          reps: 3,
            
        },

        {
          weight: 70, 
          reps: 3,
            
        },

        
    ]}
 


  const [inputList, setInputList] = useState([
        {
           weight: 60, 
           reps: 6,
            
        },

        {
          weight: 60, 
          reps: 6,
            
        },

        {
          weight: 65, 
          reps: 5,
            
        },

        {
          weight: 70, 
          reps: 3,
            
        },

        {
          weight: 70, 
          reps: 3,
            
        },

        
    ]);
  const [comment, setComment] = useState([{comment:"Shag, but made good progress. yay!"}])
  const navigate = useNavigate();


    function passtoEditedReviewDummy(){


      // inputList.map((inp) => {
      //   inp.weight === ''? inp.weight = 60 : inp.weight;
      //   inp.reps === ''? inp.reps = 5 : inp.reps
      // })

      // console.log(inputList,'sdsdsd')

      navigate('/review', { state: {sets: inputList, comment: comment } });
      //i forgot NEED HELP PS THANKS AHHAH 
    }

    const handleWeightInputChange = (e, index) => {
      console.log(e)
      const value  = e;
      const list = [...inputList];
      list[index]["weight"] = value;
      setInputList(list);
    };

    const handleRepsInputChange = (e, index) => {
      console.log(e)
      const  value  = e;
      const list = [...inputList];
      list[index]["reps"] = value;
      setInputList(list);
    };

    console.log(inputList)

    const handleTextInputChange = (e, index) => {
      console.log(e,"test")
      const  value  = e.target.value;
      const comment = value;
      setComment(value);
      console.log(comment, "here")
    };

    const handleAddClick = () => {
      setInputList([...inputList, { weight: "", reps: "" }]);
      console.log(inputList)
    };

    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
      console.log(inputList)
    };

  return (
    <>
      <Container> 
      <AppShell
        header={<Header fixed position={{ top: 0, left: 0, right:0}} 
        className={styles.TopHeader} > 
       <Grid><Grid.Col className={styles.SetReviewandSaveHeader} span={8}><Title>Edit Review</Title></Grid.Col>
       <Grid.Col  className={styles.SetHeaderIcon} span={1}>
          <Center><Link to="/home"><FontAwesomeIcon  size="lg" icon={faTrash}/></Link></Center></Grid.Col></Grid>
         
         
         </Header>}>
      </AppShell>
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
            <Image radius="lg" className={styles.homeRecentImage} src={tempthumbnail}/>
          </Center>
          <Grid className={styles.ReviewSaveInfoGrid} justify="center">
            <Grid.Col span={4} >
              <Stack align="center" spacing={1}>
                <Title order={2}> - </Title> 
                <Text size="xs"> SETS</Text> 
              </Stack>
            </Grid.Col>
            <Grid.Col span={4} >
              <Stack align="center" spacing={1}>
                <Title order={2}> - </Title> 
                <Text size="xs"> KCAL</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4} >
              <Stack  align="center" spacing={1}>
                <Title order={2}> 30:20 </Title> 
                <Text size="xs"> TIME</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>

        <Container className={styles.ReviewSaveSetsContainer}>
          <Title order={2}>Sets</Title>
          <Divider my="sm" />
          {inputList.map((x, i) => { return (
            <Grid>
              <Grid.Col span={2}><Title> {i+1}</Title></Grid.Col>
              <Grid.Col span={10}>
              <Stack spacing ={1}> 
                <NumberInput
                  placeholder="KG"
                  label="WEIGHT"
                  required
                  value={x.weight}
                  onChange={e => handleWeightInputChange(e, i)}
                />
                <NumberInput
                  placeholder="No. of Reps"
                  label="REPS"
                  required
                  value={x.reps}
                  onChange={e => handleRepsInputChange(e, i)}
                />
                
              </Stack>
            </Grid.Col>
            </Grid> );
          })}
          <Divider my="sm" />
          <Center>
            <Button onClick={handleAddClick} variant ="subtle"> + </Button>
            <Button onClick={handleRemoveClick} variant ="subtle"> - </Button>
          </Center>
        </Container>

        <Container className={styles.ReviewSaveCommentsContainer}>
          <Title order={2}>Comments</Title>
          <Divider my="sm" />
          <Textarea
            placeholder= "Write a comment (optional)"
            onChange={e => handleTextInputChange(e)} 
            defaultValue = "Shag, but made good progress. yay!"
          />
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
          <Button 
            className={styles.ReviewSaveSaveButton} 
            onClick={passtoEditedReviewDummy}
          >
            Save
          </Button>
        </Container>
      </Container>
    </>
  ); }

  export default EditReview;