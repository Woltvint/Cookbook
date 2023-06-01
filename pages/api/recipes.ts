// pages/api/recipes.js

import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/recipes.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    handlePostRequest(req, res);
  } else if (req.method === 'DELETE') {
    handleDeleteRequest(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

function handleGetRequest(req, res) {
  const { id } = req.query;

  if (id) {
    const jsonData = readDataFromFile();
    const recipe = jsonData.find((item) => item.id === Number(id));

    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } else {
    const jsonData = readDataFromFile();
    res.status(200).json(jsonData);
  }
}

function handlePostRequest(req, res) {
  const { name, description, text, ingredients } = req.body;

  const jsonData = readDataFromFile();
  const newRecipe = {
    id: jsonData.length + 1,
    name,
    description,
    text,
    ingredients,
  };

  jsonData.push(newRecipe);
  writeDataToFile(jsonData);

  res.status(201).json(newRecipe);
}

function handleDeleteRequest(req, res) {
  const { id } = req.query;

  const jsonData = readDataFromFile();
  const index = jsonData.findIndex((item) => item.id === Number(id));

  if (index !== -1) {
    const deletedRecipe = jsonData.splice(index, 1);
    writeDataToFile(jsonData);

    res.status(200).json(deletedRecipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
}

function readDataFromFile() {
  const jsonData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(jsonData);
}

function writeDataToFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}