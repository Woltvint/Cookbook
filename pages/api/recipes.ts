// pages/api/recipes.js

import fs from 'fs';
import path from 'path';

import recipesJson from "@/data/recipes.json"

var recipes = recipesJson;

import type { NextApiRequest, NextApiResponse } from 'next'
import { Recipe, Ingredient, ApiData } from '@/lib/types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiData>
) {
    await sleep(500);

    var id : null | number = null;

    if (req.query.id != null)
      id = Number(req.query.id);



    if (req.method == "GET")
    {
      if (id != null)
      {
        if (recipes.length > id)
          res.status(200).json({data:recipes[id]})
        else 
          res.status(200).json({data:null});
      }
      else
      {
        res.status(200).json({data:recipes});
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
        var idRec = rec.id;
        if (recipes.length > idRec)
        {
          recipes[idRec] = rec;
          res.status(200).json({data:recipes.length-1});
        }
        else
        {
          recipes.push(rec);
          res.status(200).json({data:recipes.length-1});
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
        if (recipes.length > id)
        {
          recipes.splice(id,1);
          res.status(200).json({data:null});
        }
          
      }
    }

    
}


function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

