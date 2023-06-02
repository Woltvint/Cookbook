import Head from 'next/head'

import { Button, Container, Input, TextInput, Textarea , NumberInput, NativeSelect, CloseButton, Group, Divider, Flex, SimpleGrid, Badge, Card, Center } from "@mantine/core";

//import recipes from "../data/recipes.json";
import { NextPageContext } from 'next';

import { ApiData, Ingredient, Recipe } from "@/lib/types";
import Link from 'next/link';
import {useEffect, useState} from "react"
import { Router, useRouter } from 'next/router';

export default function Page({recipes} : {recipes : Recipe[]}) {

  
  const [recipeList,setRecipeList] = useState(recipes);
  const [search,setSearch] = useState("");
console.log("======================================================================");
console.log(recipes);
console.log("======================================================================");

  const searchFilter = (rec : Recipe) => {
    var searchWord = search.trim().toLowerCase();

    if (searchWord == "")
      return true;

    var keywords = searchWord.split(" ");

    var found = false;

    var text = "";

    text += rec.title.trim().toLowerCase() + "";
    text += rec.description.trim().toLowerCase() + "";
    text += rec.text.trim().toLowerCase() + "";

    rec.tags.forEach((t) => text += t + " ");
    rec.ingredients.forEach((t) => text += t.name + " ");

    keywords.forEach(k => {
      if (text.includes(k))
        found = true;
    });

    return found;
  }


  return (
    <>
      <Head>
        <title>Cookbook</title>
      </Head>

      <Container>
        <Input placeholder='Search...' size='xl' classNames={{input: "search"}} value={search} onChange={(e) => setSearch(e.target.value)}/>
        <br/><br/>
        <SimpleGrid cols={3} breakpoints={[{maxWidth: "sm", cols: 1}, {maxWidth: "md", cols:2}]} spacing={20}>
          {recipes.filter((rec) => searchFilter(rec)).map((recipe) => 
            <Link href={"/recipe/" + recipe.id}>
              <Card style={{backgroundColor: "#e74646", aspectRatio: "1", boxShadow: "0px 0px 100px #000000AA", padding: "10px 15px"}} className={"panels"}>
                <Container style={{height: "100%", width: "100%"}}>
                  <Card.Section><h2 style={{textAlign: 'center'}}>{recipe.title}</h2></Card.Section>
                  <Card.Section>
                    <Divider color='dark' />
                     <center  style={{height: "1.75em", overflow: 'hidden'}}>{recipe.tags.map((t) => <Badge color="dark" variant='filled'>{t}</Badge>)}</center>
                    <Divider color='dark' />
                  </Card.Section>
                  <Card.Section>
                    <p>{recipe.description}</p>
                  </Card.Section>
                </Container>
              </Card>
            </Link>
          )}
        </SimpleGrid>
      </Container>
    </> 
  )
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const json : ApiData = await(await fetch("https://cookbook.woltvint.net//api/recipes")).json();
  //console.log(json);
  const recipes : Recipe[] = json.data;
  return { recipes: [...recipes] }; 
};