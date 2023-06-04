export type Recipe = {
    id: number,
    title: string,
    description: string,
    text: string,
    ingredients : Ingredient[],
    tags: string[],
    prepTime: number
  }
  
export type Ingredient = {
    name: string, 
    count: number, 
    unit: string
}

export type ApiData = {
    data: any,
    error: string
}