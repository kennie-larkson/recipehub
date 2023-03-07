import React, { useState } from "react";

import "./searchbar.css";
import { IRecipe } from "../hooks/useFetch";
import { useHistory } from "react-router-dom";

type RecipeListType = {
  recipes: IRecipe[];
};

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(term);
    history.push(`/search?q=${term}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          maxLength={30}
          placeholder="enter your search keyword"
          required
        />
      </form>
    </div>
  );
}
