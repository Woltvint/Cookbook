import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/ingredients.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Retrieve all ingredients
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    const ingredients = JSON.parse(jsonData);

    res.status(200).json(ingredients);
  } else if (req.method === 'POST') {
    // Add a new ingredient
    const { name, unit } = req.body;

    // Read the existing ingredients
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    const ingredients = JSON.parse(jsonData);

    // Generate a unique ID for the new ingredient
    const ingredientId = ingredients.length + 1;

    // Create a new ingredient object
    const newIngredient = {
      id: ingredientId,
      name,
      unit,
    };

    // Add the new ingredient to the existing ingredients
    ingredients.push(newIngredient);

    // Write the updated ingredients back to the JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(ingredients));

    res.status(200).json({ success: true, ingredient: newIngredient });
  } else if (req.method === 'DELETE') {
    // Delete an ingredient by ID
    const { id } = req.body;

    // Read the existing ingredients
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    let ingredients = JSON.parse(jsonData);

    // Find the index of the ingredient with the specified ID
    const index = ingredients.findIndex((ingredient) => ingredient.id === id);

    // If the ingredient is found, remove it from the array
    if (index !== -1) {
      ingredients = ingredients.filter((ingredient) => ingredient.id !== id);

      // Write the updated ingredients back to the JSON file
      fs.writeFileSync(dataFilePath, JSON.stringify(ingredients));
    }

    res.status(200).json({ success: true });
  }
}
