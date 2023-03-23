import React from "react";
import { useEffect } from "react";
import RecipeList from "../../components/RecipeList";
import useFetch, { IRecipe } from "../../hooks/useFetch";

import "./home.css";

export default function Home() {
  const { isPending, error, recipes, postData } = useFetch();

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
