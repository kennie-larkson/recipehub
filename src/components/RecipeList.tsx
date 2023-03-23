import React from "react";
import { Link } from "react-router-dom";
import { IRecipe } from "../hooks/useFetch";
import { useContext } from "react";

import "./recipelist.css";
import ThemeContext from "../context/ThemeContext";

type RecipeListType = {
  recipes: IRecipe[];
};

export default function RecipeList({ recipes }: RecipeListType) {
  const { mode } = useContext(ThemeContext);

  if (recipes.length === 0) {
    return <div className="error">No recipes match your search</div>;
  }
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  );
}
