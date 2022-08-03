import React from "react"
import { useState} from "react";
import { Container, Grid, Text, Stack, Title, Divider, Center, Image, NumberInput, Button, Textarea, List, Breadcrumbs, Anchor } from "@mantine/core";
import styles from './styles.module.css';
import { useNavigate} from "react-router-dom";
import thumbnailabby from '../Components/thumbnailabby.jpg';
import PieChart from "../Components/PieChart";
import { AppShell, Header } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
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


  

    const handleclick60 = index => {
      console.log(index,"helloooo60")
      console.log(inputList)
      const list = [...inputList];
      console.log(list, "list")
      list[index]["weight"] = 60;
      setInputList(list);
      

    };

    const handleclick55 = index => {
      const list = [...inputList];
      list[index]["weight"] = 55;
      setInputList(list);
      console.log(inputList)
      console.log(index,"helloooo70")
    };

    const handleclick50 = index => {
      const list = [...inputList];
      list[index]["weight"] = 50;
      setInputList(list);
      console.log(inputList)
      console.log(index,"helloooo80")
    };


    const handleclick3 = index => {
      const list = [...inputList];
      list[index]["reps"] = 3;
      setInputList(list);
      console.log(inputList)
      console.log(index,"helloooo70")
    };

    const handleclick5 = index => {
      const list = [...inputList];
      list[index]["reps"] = 5;
      setInputList(list);
      console.log(inputList)
      console.log(index,"helloooo70")
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
                {/* <Breadcrumbs 
                 index={i}>
                {weightoptions}
                </Breadcrumbs> */}
                <Grid className={styles.SetWeightBreadCrumb}>
                  <Grid.Col span ={1}><Center><Anchor onClick = { () => handleclick50(i)}>50</Anchor></Center></Grid.Col>
                  <Grid.Col span ={1}>|</Grid.Col>
                  <Grid.Col span ={1}><Center><Anchor onClick={ () => handleclick55(i)}>55</Anchor></Center></Grid.Col>
                  <Grid.Col span ={1}>|</Grid.Col>
                  <Grid.Col span ={1}><Center><Anchor onClick={ () => handleclick60(i)}>60</Anchor></Center></Grid.Col>
                </Grid>
                  <NumberInput
                    placeholder="KG"
                    label="WEIGHT"
                    required
                    value={x.weight}
                    onChange={e => handleWeightInputChange(e, i)}
                    hideControls
                  />
                  <Grid className={styles.SetWeightBreadCrumb}>
                  <Grid.Col span ={1}><Center><Anchor onClick = { () => handleclick3(i)}>3</Anchor></Center></Grid.Col>
                  <Grid.Col span ={1}>|</Grid.Col>
                  <Grid.Col span ={1}><Center><Anchor onClick={ () => handleclick5(i)}>5</Anchor></Center></Grid.Col>
                </Grid>
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
            
    
          <FontAwesomeIcon  
              size="2x" 
              icon={faPlusCircle}
              color='orange'
              onClick={handleAddClick}
              className={styles.EditSetsButtons}
            />
            <FontAwesomeIcon  
              size="2x" 
              color='orange'
              icon={faMinusCircle}
              onClick={handleRemoveClick}
              className={styles.EditSetsButtons}
            />

            
          </Center>
        </Container>

        <Container className={styles.ReviewSaveCommentsContainer}>
          <Title  className={styles.ReviewInfoText} order={2}>Comments</Title>
          <Divider my="sm" />
          <Textarea
            placeholder= "Write a comment (optional)"
            onChange={e => handleTextInputChange(e)} 
          />
          
          <Divider my="sm" />
          <Center>
          <Button 
          color = "orange"
            className={styles.ReviewSaveSaveButton} 
            onClick={passtoReview}
            size="lg"
          >
            Save
          </Button></Center>
        </Container>


        
        </Container>

    </>
  ); }

  export default ReviewandSave;