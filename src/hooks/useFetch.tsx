import { useState } from "react";
import { useParams } from "react-router-dom";

export interface IRecipe {
  id?: string;
  title: string;
  ingredients: string[];
  cookingTime: string;
  method: string;
}

export interface IRequest {
  url: string;
  fields?: IRecipe;
  httpMethod?: string;
}

export interface IError {
  name?: string;
  message: string;
}

export default function useFetch() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<IError>({ name: "", message: "" });
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [recipe, setRecipe] = useState<IRecipe>({
    id: "",
    title: "",
    ingredients: [],
    cookingTime: "",
    method: "",
  });

  const { id } = useParams<{ id: string }>();

  async function postData({ url, fields, httpMethod = "GET" }: IRequest) {
    setIsPending(true);
    setError({ name: "", message: "" });

    try {
      const response = await fetch(url, {
        method: `${httpMethod}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      const data = await response.json();

      setIsPending(false);
      if (!id) {
        setRecipes(data);
      } else {
        setRecipe(data);
      }

      setError({ name: "", message: "" });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setError({ message: "request was aborted", name: "AbortError" });
        }
      } else {
        console.log(error);
      }
    } finally {
      setIsPending(false);
    }
  }

  return { isPending, error, recipe, recipes, postData };
}
