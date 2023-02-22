import React from "react";
import "./recipe.css";
import { useParams } from "react-router-dom";

import useFetch, { IRecipe } from "../../hooks/useFetch";

export default function Recipe() {
  const { id } = useParams<{ id: string }>();

  const { recipes, recipe, error, isPending } = useFetch(
    `http://localhost:3000/recipes/${id}`
  );

  const { title, cookingTime, ingredients, method } = recipe as IRecipe;

  return (
    <div
      className="recipe"
      // style={{
      //   border: "1px solid gray",
      //   borderRadius: "10px",
      //   marginTop: "10px",
      //   padding: "15px",
      //   width: "70%",
      //   display: "flex",
      //   flexDirection: "column",
      // }}
    >
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{title}</h2>
          <p>Takes {cookingTime} to cook.</p>
          <ul>
            {ingredients &&
              ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
          </ul>
          <p className="method">{method}</p>
        </>
      )}
    </div>
  );
}
