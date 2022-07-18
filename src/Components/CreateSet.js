import React from "react"
import { useLayoutEffect, useState } from "react";
import { Container, Grid, Text, Stack, Title, Divider, Center, Image, TextInput, NumberInput, Button, Textarea, List } from "@mantine/core";
import styles from './styles.module.css';
import { Link} from "react-router-dom";


function CreateSet(props) {
    const {
        handleAddClick,
            handleRemoveClick,
            handleInputChange,
            inputList,
            setInputList,
            
        
      } = props;

    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");





  return (
    <>
{inputList.map((x, i) => {
<Container className={styles.ReviewSaveSetsContainer}>
            
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
            </Grid>
            <Divider my="sm" />
       
        </Container> })}
      

      </>
  ); }

  export default CreateSet;