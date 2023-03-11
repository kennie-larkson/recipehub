import React from "react";
import { useEffect } from "react";
import RecipeList from "../../components/RecipeList";
import useFetch, { IRecipe } from "../../hooks/useFetch";

import "./home.css";
export interface IRequest {
  url: string;
  fields?: IRecipe;
  httpMethod: string;
}

export default function Home() {
  //   const { recipes, isPending, error } = useFetch(
  //     "http://localhost:3000/recipes"
  //   );

  const { isPending, error, recipes, postData } = useFetch();
  //const response = getData.postData({url:"http://localhost:3000/recipes" });

  useEffect(() => {
    postData({
      url: "http://localhost:3000/recipes",
    });
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="">Loading...</p>}
      {recipes && <RecipeList recipes={recipes as IRecipe[]} />}
    </div>
  );
}
