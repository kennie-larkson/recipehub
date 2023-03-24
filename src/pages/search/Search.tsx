import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import useFetch from "../../hooks/useFetch";

import "./search.css";

export default function Search() {
  const queryParams = useLocation();
  const queryString = queryParams.search;
  const query = new URLSearchParams(`${queryString}`).get("q");

  const url = `http://localhost:3000/recipes?q=${query}`;

  const { error, recipes, isPending, postData } = useFetch();
  useEffect(() => {
    postData({ url });
  }, [url]);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {/* {recipes && <RecipeList recipes={recipes} />} */}
    </div>
  );
}
