import React from "react";
import RecipeList from "../../components/RecipeList";
import useFetch, { IRecipe } from "../../hooks/useFetch";

import "./home.css";

export default function Home() {
  const { recipes, isPending, error } = useFetch(
    "http://localhost:3000/recipes"
  );

  return (
    <div className="home">
      {/* {recipes && <Searchbar recipes={recipes as IRecipe[]} />} */}
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="">Loading...</p>}
      {recipes && <RecipeList recipes={recipes as IRecipe[]} />}
    </div>
  );
}
