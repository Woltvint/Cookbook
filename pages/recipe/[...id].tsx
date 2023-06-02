import { Button, Container, Input, TextInput, Textarea , NumberInput, NativeSelect, CloseButton, Group, Divider, Flex, SimpleGrid, Badge, Space } from "@mantine/core";
import { IconCross } from '@tabler/icons-react';
import Head from "next/head";
import { Router, useRouter } from "next/router";

import {useEffect, useState} from "react"
import { NextPageContext } from 'next';
 
import Link from "next/link";

import { ApiData, Ingredient, Recipe } from "@/lib/types";





export default function Page({ recipe }: { recipe: Recipe }) {

  const [rec,setRec] = useState(recipe);
  const [edit,setEdit] = useState(false);
  const [saved,setSaved] = useState(true);
  const [servings, setServings] = useState(1);

  const saveRec = async () => {
    setSaved(false);
    recipe = rec;
    await fetch("https://cookbook.woltvint.net//api/recipes",{method: "POST", body: JSON.stringify(recipe)})
    setSaved(true);
  };

  const setIngredient = (i : number, ing : Ingredient ) => {rec.ingredients[i] = ing;setRec({...rec, ingredients: rec.ingredients})}
  const removeIngredient = (i: number) => {rec.ingredients.splice(i,1);setRec({...rec, ingredients: rec.ingredients});}
  const addIngredient = (ing : Ingredient) => {rec.ingredients.push(ing); setRec({...rec, ingredients: rec.ingredients}); }

  const setTag = (i : number, tag : string ) => {rec.tags[i] = tag; setRec({...rec})}
  const removeTag = (i: number) => {rec.tags.splice(i,1); setRec({...rec});}
  const addTag = () => {rec.tags.push("new-tag"); setRec({...rec});}

  return( 
    <>
      <Head>
        <title>{saved ? rec.title : "Saving..."}</title>
      </Head>
      <br/>
      <Container style={{width: "100%", backgroundColor: "#e74646", padding: "10px 20px", borderRadius: "10px", boxShadow: "0px 0px 500px #555555"}} className={"panels"}>
        <Button onClick={() => setEdit(!edit)} style={{float: "right"}}>{edit ? "Back" : "Edit"}</Button>
        <Button onClick={() => setEdit(!edit)} style={{float: "right", margin: "0px 10px"}}>Print</Button>
        {!edit ? 
          <>
            <h1 style={{textAlign: "center"}}>{rec.title}</h1>
            <Divider color='dark' size={"sm"} />
            <center  style={{height: "3.5em", overflow: 'hidden'}}>{rec.tags.map((t) => <Badge color="dark" variant='filled'>{t}</Badge>)}</center>
            <Divider color='dark' size={"sm"} />
            
            <br/>
            {rec.description.split("\n").map((t) => <p>{t}</p>)}
            <br/>

            <Group style={{float: "right"}}><b>Servings</b><NumberInput style={{width: "4em"}} min={1} max={100} value={servings} onChange={(e) => setServings(Number(e))}/></Group>
            <h3>Ingredients:</h3>
            
            <SimpleGrid cols={3} breakpoints={[{maxWidth: "sm", cols: 2},{maxWidth: "xs", cols: 1}]}>
              {rec.ingredients.map((ing) => { return <li><b>{ing.count * servings} {ing.unit}</b> {ing.name}</li>})}
            </SimpleGrid>
            
            
            <br/>
            <Divider color='dark' size={"sm"} />
            <Space h={4} />
            <Divider color='dark' size={"sm"} />
            <h3>Recipe:</h3>
            {rec.text.split("\n").map((t) => {
            t.substring(1,t.length-2)
            var m = t.match(/\{(\d+(?:\.\d+)?)\}/g) ?? [];
            m.forEach((s) => {t = t.replaceAll(s, (parseFloat(s.substring(1,s.length-1)) * servings).toString() )})
            return (<p>{t}</p>);
            })}
          </>
          :
          <>
            <Container onChange={() => {saveRec();}} style={{margin:0, padding: 0,width:"100%"}}>
              <br/>
              <TextInput value={rec.title} onChange={(e) => {setRec({...rec,title: e.target.value});}} size="xl" label="Title"/>
              <br/>
              <Textarea value={rec.description} onChange={(e) => {setRec({...rec,description: e.target.value});}}label="Description" minRows={4}/>
              <br/>
              <Textarea value={rec.text} onChange={(e) => {setRec({...rec,text: e.target.value});}} label="Text" minRows={10} />
              <br/>

              <SimpleGrid cols={2} breakpoints={[{maxWidth: "sm", cols: 1}]}>
                <Container style={{margin:0, padding: 0,width:"100%"}}>
                  <h4>Ingredients:</h4>
                  {rec.ingredients.map((ing,i) => { 
                    return (
                      <Flex style={{width: "100%",margin:0,padding:0}}>
                        <CloseButton size={"md"} onClick={() => {removeIngredient(i);saveRec();}} color="black"/>
                        <TextInput value={ing.name} onChange={(e) => {setIngredient(i,{...rec.ingredients[i],name: e.target.value})}} style={{}}/>
                        <NumberInput value={ing.count} onChange={(e) => {setIngredient(i,{...rec.ingredients[i],count: Number(e)});saveRec();}} onInput={() => {}} min={1} style={{minWidth: "4em", maxWidth: "6em"}}/>
                        <NativeSelect value={ing.unit} onChange={(e) => {setIngredient(i,{...rec.ingredients[i],unit: e.target.value})}} style={{minWidth: "5em", maxWidth: "4em"}} data={[{value: "g", label: "g"},{value: "ml", label: "ml"},{value: "tsp",label: "tsp"},{value: "cup",label: "cup"},{value: " ",label: " "}]}/>
                      </Flex>
                    )
                  })}
                  <br/>
                  <Button onClick={() => { addIngredient({name: "new", count: 1, unit: "g"}); saveRec(); }} >Add</Button>
                </Container>
                <Container style={{margin:0, padding: 0,width:"100%"}}>
                  <h4>Tags:</h4>
                  {rec.tags.map((tag,i) => { 
                    return (
                      <Flex style={{width: "100%",margin:0,padding:0}}>
                        <CloseButton size={"md"} onClick={() => {removeTag(i);saveRec();}} color="black"/>
                        <TextInput value={tag} onChange={(e) => {setTag(i,e.target.value)}}/>
                      </Flex>
                    )
                  })}
                  <br/>
                  <Button onClick={() => { addTag(); saveRec(); }}>Add</Button>
                </Container>
              </SimpleGrid>
              
            </Container>
          </>
        }
        <br/>
        <h3 style={{display: saved? "none":"initial", position: "fixed", top: "10px", left: "10px", color: "black"}}>Saving...</h3>
      </Container>
    </>
  );
}



Page.getInitialProps = async (ctx: NextPageContext) => {
  const id = ctx.query.id??"";
  const json : ApiData = await(await fetch("https://cookbook.woltvint.net//api/recipes?id=" + Number(id))).json();
  console.log(json);
  return { recipe: {...json.data} };
};
 