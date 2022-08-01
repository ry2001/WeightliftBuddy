import React from "react"
import { useState} from "react";
import { Container, Grid, Text, Stack, Title, Divider, Center, Image, NumberInput, Button, Textarea, List } from "@mantine/core";
import styles from './styles.module.css';
import { useNavigate} from "react-router-dom";
import thumbnailabby from '../Components/thumbnailabby.jpg';
import PieChart from "../Components/PieChart";
import { AppShell, Header } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";



function ReviewandSave() {

    // const [inputList, setInputList] = useState([{ weight: "", reps: ""}]);
    // const [comment, setComment] = useState([{comment:""}])
    const [inputList, setInputList] = useState([{ weight: "", reps: ""}]);
    const [comment, setComment] = useState([""])
    const navigate = useNavigate();

    function passtoReview(){
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
      <Container className={styles.ReviewSaveContainer}> 
      {/* <AppShell
        header={
          <Header fixed position={{ top: 0, left: 0, right:0}} 
                  className={styles.TopHeader} 
          > 
            <Grid>
              <Grid.Col className={styles.SetReviewandSaveHeader} span={8}>
                <Title>Review and Save</Title>
              </Grid.Col>
              <Grid.Col  className={styles.SetHeaderIcon} span={1}>
                <Center>
                  <Link to="/home"><FontAwesomeIcon  size="lg" icon={faTrash}/></Link>
                </Center>
              </Grid.Col>
            </Grid>
          </Header>}>
        </AppShell> */}
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
                <Title className={styles.ReviewInfoText} order={2}> - </Title> 
                <Text size="xs" className={styles.ReviewInfoType}> SETS</Text> 
              </Stack>
            </Grid.Col>
            <Grid.Col span={4} >
              <Stack align="center" spacing={1}>
                <Title className={styles.ReviewInfoText} order={2}> - </Title> 
                <Text size="xs" className={styles.ReviewInfoType}> KCAL</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4} >
              <Stack  align="center" spacing={1}>
                <Title className={styles.ReviewInfoText} order={2}> 67:20 </Title> 
                <Text size="xs" className={styles.ReviewInfoType}> TIME</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>

        <Container className={styles.ReviewSaveSetsContainer}>
          <Title className={styles.ReviewInfoText} order={2}>Sets</Title>
          <Divider my="sm" />
          {inputList.map((x, i) => { return (
            <Grid>
              <Grid.Col span={2}>
                <Title> {i+1}</Title>
              </Grid.Col>
              <Grid.Col span={10}>
                <Stack spacing ={1}> 
                  <NumberInput
                    placeholder="KG"
                    label="WEIGHT"
                    required
                    value={x.weight}
                    onChange={e => handleWeightInputChange(e, i)}
                    hideControls
                  />
                  <NumberInput
                    placeholder="No. of Reps"
                    label="REPS"
                    required
                    value={x.reps}
                    onChange={e => handleRepsInputChange(e, i)}
                    hideControls
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
          <Title  className={styles.ReviewInfoText} order={2}>Comments</Title>
          <Divider my="sm" />
          <Textarea
            placeholder= "Write a comment (optional)"
            onChange={e => handleTextInputChange(e)} 
          />
        </Container>

        <Container className={styles.ReviewSavePostureContainer}>
          <Title className={styles.ReviewInfoText} order={2}>Posture</Title>
          <Divider my="sm" />
          <Text className={styles.ReviewInfoType} > Feedback from our AI</Text>
          <Center>
            <PieChart/>
          </Center>
          <Title className={styles.ReviewInfoText} order={3}> Issues: </Title>
          <List>
            <List.Item className={styles.ReviewInfoType} >Back was not straight</List.Item>
            <List.Item className={styles.ReviewInfoType} >Arms were bent</List.Item>
          </List>
          <Divider my="sm" />
          <Button 
            className={styles.ReviewSaveSaveButton} 
            onClick={passtoReview}
          >
            Save
          </Button>
        </Container>
      </Container>
    </>
  ); }

  export default ReviewandSave;