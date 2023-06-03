// pages/api/recipes.js

import fs from 'fs';
import path from 'path';

import recipesJson from "@/data/recipes.json"

const emptyRec : Recipe = {id: -1, description: "", ingredients: [], tags: [], text: "", title: "New Recipe"};

var recipes : { [key: number]: Recipe | undefined } = recipesJson;


import type { NextApiRequest, NextApiResponse } from 'next'
import { Recipe, Ingredient, ApiData } from '@/lib/types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiData>
) {
    //await sleep(500);

    var id : null | number = null;

    if (req.query.id != null)
      id = Number(req.query.id);



    if (req.method == "GET")
    {
      if (id != null)
      {
        if (recipes[id] != undefined)
          res.status(200).json({data:recipes[id]})
        else 
          res.status(200).json({data:null});
      }
      else
      {
        var list = Object.keys(recipes).map((k) => recipes[Number(k)] ?? emptyRec);
        res.status(200).json({data:list});
      }
    }
    else if (req.method == "POST")
    {
      var rec : Recipe | null = null;
      try {
        rec = JSON.parse(req.body);
      } catch (error) {
        console.log("bad post request");
      }
      
      if (rec)
      {
        if (recipes[rec.id] != undefined)
        {
          recipes[rec.id] = rec;
          res.status(200).json({data:rec.id});
        }
        else
        {
          var key = Math.random() * 10000000;

          rec.id = key;
          recipes[key] = rec;
          res.status(200).json({data:key});
        }

        fs.writeFileSync("./data/recipes.json",JSON.stringify(recipes));
      }
      else
      {
        res.status(200).json({data:null});
      }
      
    }
    else if (req.method == "DELETE")
    {
      if (id != null)
      {
        if (recipes[id] != null)
        {
          delete recipes[id];
          res.status(200).json({data:null});
          fs.writeFileSync("./data/recipes.json",JSON.stringify(recipes));
        }
          
      }
    }

    
}


function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

