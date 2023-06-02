export type Recipe = {
    id: number,
    title: string,
    description: string,
    text: string,
    ingredients : Ingredient[],
    tags: string[]
  }
  
export type Ingredient = {
    name: string, 
    count: number, 
    unit: string
}

export type ApiData = {
    data: any
}