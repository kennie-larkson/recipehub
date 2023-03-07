import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import useFetch, { IRecipe } from "../hooks/useFetch";
import Searchbar from "./Searchbar";

export default function Navbar() {
  // const { recipes, error, isPending } = useFetch(
  //   "http://localhost:3000/recipes"
  // );
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>RecipeHub</h1>
        </Link>
        {/* {recipes && <Searchbar recipes={recipes as IRecipe[]} />} */}
        <Searchbar />

        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
