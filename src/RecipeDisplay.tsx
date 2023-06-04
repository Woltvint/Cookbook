import { Recipe } from "@/lib/types";
import { Card, Container, Divider, Badge } from "@mantine/core/";
import Link from "next/link";

export default function RecipeDisplay({recipe} : {recipe:Recipe})
{
    return (
        <Link href={"/recipe/" + recipe.id} key={"link"+ recipe.id}>
            <Card style={{backgroundColor: "#e74646", aspectRatio: "1", boxShadow: "0px 0px 100px #000000AA", padding: "10px 15px"}} className={"panels"} key={recipe.id}>
                <Container style={{height: "100%", width: "100%"}}>
                    <Card.Section>
                        <h2 style={{textAlign: 'center'}}>{recipe.title}</h2>
                    </Card.Section>
                    <Card.Section>
                        <Divider color='dark' />
                        <center key={"center" + recipe.id} style={{height: "1.75em", overflow: 'hidden'}}>
                            {recipe.tags.map((t) => <Badge key={t} color="dark" variant='filled'>{t}</Badge>)}
                        </center>
                        <Divider color='dark' />
                    </Card.Section>
                    <Card.Section>
                        <p>{recipe.description}</p>
                    </Card.Section>
                </Container>
            </Card>
        </Link>
    );
}