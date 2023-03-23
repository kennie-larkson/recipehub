import React, { useEffect } from "react";
import "./recipe.css";
import { useParams, Link } from "react-router-dom";

import useFetch, { IRecipe } from "../../hooks/useFetch";

export default function Recipe() {
  const { id } = useParams<{ id: string }>();
  const url = `http://localhost:3000/recipes/${id}`;
  const { recipe, error, isPending, postData } = useFetch();

  useEffect(() => {
    postData({
      url,
    });
  }, [url]);

  const { title, cookingTime, ingredients, method } = recipe as IRecipe;

  return (
    <div className="recipe">
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
      <Link to="/" style={{ textDecoration: "none" }}>
        Go back
      </Link>
    </div>
  );
}
