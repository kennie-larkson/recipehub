import React, { useState } from "react";

import "./searchbar.css";
import { IRecipe } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate(`/search?q=${term}`);
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
