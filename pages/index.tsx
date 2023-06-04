import Head from 'next/head'
import { Button, Container, Input, SimpleGrid } from "@mantine/core";
import { NextPageContext } from 'next';
import { ApiData, Recipe } from "@/lib/types";
import { useState } from "react"
import { useRouter } from 'next/router';
import RecipeDisplay from '@/src/RecipeDisplay';
import { baseUrl } from '@/lib/env';

export default function Page({recipes} : {recipes : Recipe[]}) {
  const router = useRouter();
  const [search,setSearch] = useState("");

  const searchFilter = (rec : Recipe) => {
    var searchWord = search.trim().toLowerCase();

    if (searchWord == "")
      return true;

    var keywords = searchWord.split(" ");
    var found = false;
    var text = "";

    text += rec.title.trim().toLowerCase() + " ";
    text += rec.description.trim().toLowerCase() + " ";
    text += rec.text.trim().toLowerCase() + " ";

    rec.tags.forEach((t) => text += t.toLowerCase() + " ");
    rec.ingredients.forEach((t) => text += t.name.toLowerCase() + " ");

    keywords.forEach(k => { if (text.includes(k)) found = true; });

    return found;
  }

  const addRecipe = async () => {
    var rec : Recipe;
    rec = {id: -1, description: "", ingredients: [], tags: [], text: "",prepTime: 0 , title: "New Recipe"}
    var data = await (await fetch(baseUrl + "api/recipes",{method: "POST", body: JSON.stringify(rec)})).json()
    router.push(baseUrl + "recipe/" + data.data);
  }

  return (
    <>
      <Head>
        <title>Cookbook</title>
      </Head>

      <Container>
        <Input placeholder='Search...' size='xl' classNames={{input: "search"}} value={search} onChange={(e) => setSearch(e.target.value)}/>
        <br/>
        <Button onClick={() => addRecipe()} style={{float: "right"}}>Add Recipe</Button>
        <br/><br/>
        <SimpleGrid cols={3} breakpoints={[{maxWidth: "sm", cols: 1}, {maxWidth: "md", cols:2}]} spacing={20}>
          {recipes.filter((rec) => searchFilter(rec)).map((recipe) => 
            <RecipeDisplay recipe={recipe} key={"recCard"+recipe.id} />
          )}
        </SimpleGrid>
      </Container>
    </> 
  )
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const json : ApiData = await(await fetch(baseUrl + "api/recipes")).json();
  const recipes : Recipe[] = json.data;
  return { recipes: [...recipes] }; 
};