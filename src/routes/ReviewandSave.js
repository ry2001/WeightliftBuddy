import React from "react"
import { useLayoutEffect, useState} from "react";
import { Container, Grid, Text, Stack, Title, Divider, Center, Image, TextInput, NumberInput, Button, Textarea, List } from "@mantine/core";
import styles from './styles.module.css';
import { Link} from "react-router-dom";
import tempthumbnail from '../Components/tempthumbnail.jpg';
import CreateSet from "../Components/CreateSet";


function ReviewandSave() {

    
    const [reviewSets, setReviewSets] = useState("")
    const [inputList, setInputList] = useState([{ weight: "", reps: "" }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };

      const handleAddClick = () => {
        setInputList([...inputList, { weight: "", reps: 5 }]);
      };

      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };

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
            <Grid.Col span={4} ><Stack align="center" spacing={1}><Title order={2}> - </Title> <Text size="xs"> SETS</Text> </Stack></Grid.Col>
            <Grid.Col span={4} ><Stack align="center" spacing={1}><Title order={2}> - </Title> <Text size="xs"> KCAL</Text></Stack></Grid.Col>
            <Grid.Col span={4} ><Stack  align="center" spacing={1}><Title order={2}> 30:20 </Title> <Text size="xs"> TIME</Text></Stack></Grid.Col>
            </Grid>
        </Container>


       
        <Container className={styles.ReviewSaveSetsContainer}>
            <Title order={2}>Sets</Title>
            <Divider my="sm" />

            {inputList.map((x, i) => {
        return (
            <Grid>
                <Grid.Col span={2}><Title> 1</Title></Grid.Col>
                <Grid.Col span={10}>
                <Stack spacing ={1}> 
                <TextInput
                    placeholder="KG"
                    label="WEIGHT"
                    required
                    value={x.weight}
                    handleInputChange={handleInputChange}
                    />
                <NumberInput
                    defaultValue={5}
                    placeholder="No. of Reps"
                    label="REPS"
                    required
                    value={x.reps}
                    handleInputChange={handleInputChange}
                    />
                </Stack>
                </Grid.Col>
            </Grid> );
            })}
            <Divider my="sm" />
            <Center><Button onClick={handleAddClick} variant ="subtle"> + </Button></Center>
        </Container>



        <Container className={styles.ReviewSaveCommentsContainer}>
            <Title order={2}>Comments</Title>
            <Divider my="sm" />
            <Textarea
            placeholder= "Write a comment (optional)"/>
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
            <Link to="/review">
            <Button className={styles.ReviewSaveSaveButton} >Save</Button></Link>
        </Container>






      </Container>
      </>
  ); }

  export default ReviewandSave;