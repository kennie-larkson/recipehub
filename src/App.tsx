import React from "react";

import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";
import Create from "./pages/create/Create";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* <Switch> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Home />
        </Route> */}
          <Route path="/create" element={<Create />} />
          {/* <Create />
        </Route> */}
          <Route path="/recipes/:id" element={<Recipe />} />
          {/* <Recipe />
        </Route> */}
          <Route path="/search" element={<Search />} />
          {/* <Search />
        </Route> */}
          {/* </Switch> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
