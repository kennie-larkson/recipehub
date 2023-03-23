import React from "react";

import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";
import Create from "./pages/create/Create";
import ThemeSelector from "./components/ThemeSelector";

import { useThemeContext } from "./hooks/useThemeContext";
import "./App.css";

function App() {
  const { mode } = useThemeContext();
  console.log(mode);

  return (
    <div
      className={`App ${mode}`}
      //style={{ background: mode === "dark" ? "black" : "white" }}
    >
      <Router>
        <Navbar />
        <ThemeSelector />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/create" element={<Create />} />

          <Route path="/recipes/:id" element={<Recipe />} />

          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
