import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Recipe, ApiData } from '@/lib/types';

import recipesJson from "@/data/recipes.json"
import { IconBrackets } from '@tabler/icons-react';

const emptyRec : Recipe = {id: -1, description: "", ingredients: [], tags: [], text: "",prepTime: 0 , title: "New Recipe"};
var recipes : { [key: number]: Recipe | undefined } = recipesJson;


export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiData>) {
  var id : null | number = null;

  if (req.query.id != null)
    id = Number(req.query.id);

  switch (req.method) {
    case "GET":
      GetRecipe(req,res,id);
      break;
    case "POST":
      PostRecipe(req,res);
      break;
    case "DELETE":
      DeleteRecipe(req,res,id);
      break;
  
    default:
      res.status(400).json({data:null, error: "bad request"});
      break;
    }
}

function GetRecipe(req: NextApiRequest, res: NextApiResponse<ApiData>, id: number | null) 
{
  if (id != null)
  {
    if (recipes[id] != undefined)
      res.status(200).json({data:recipes[id], error: ""})
    else 
      res.status(404).json({data:null, error: "the recipe with this id does not exits"});
  }
  else
  {
    var list = Object.keys(recipes).map((k) => recipes[Number(k)] ?? emptyRec);
    res.status(200).json({data:list, error: ""});
  }
}

function PostRecipe(req: NextApiRequest, res: NextApiResponse<ApiData>) 
{
  var rec : Recipe = emptyRec;
    try {
      rec = {...rec, ...(JSON.parse(req.body))};
    } catch (error) {
      res.status(400).json({data:null, error: "bad post request body: " + error});
      return;
    }

    rec.title = rec.title.trim();
    rec.description = rec.description.trim();
    rec.text = rec.text.trim();
    
    for (let i = 0; i < rec.tags.length; i++) {
      rec.tags[i] = rec.tags[i].trim();
    }  
    
    for (let i = 0; i < rec.ingredients.length; i++) {
      rec.ingredients[i].name = rec.ingredients[i].name.trim();
    }  

    if (recipes[rec.id] != undefined)
    {
      recipes[rec.id] = rec;
      res.status(200).json({data:rec.id, error: ""});
    }
    else
    {
      var key = Math.random() * 10000000;

      rec.id = key;
      recipes[key] = rec;
      res.status(200).json({data:key, error: ""});
    }

    fs.writeFileSync("./data/recipes.json",JSON.stringify(recipes));
}

function DeleteRecipe(req: NextApiRequest, res: NextApiResponse<ApiData>, id: number | null)
{
  if (id != null)
  {
    if (recipes[id] != null)
    {
      delete recipes[id];
      res.status(200).json({data:null, error: ""});
      fs.writeFileSync("./data/recipes.json",JSON.stringify(recipes));
    }
    else 
    {
      res.status(404).json({data:null, error: "the recipe with this id does not exits"});
    }
      
  }
}
