import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

import Searchbar from "./Searchbar";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function Navbar() {
  const { color } = useContext(ThemeContext);
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>RecipeHub</h1>
        </Link>

        <Searchbar />

        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
