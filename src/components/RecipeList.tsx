import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecipesType } from "../pages/home/Home";
import DeleteIcon from "../ assets/delete-icon.svg";
import "./recipelist.css";
import ThemeContext from "../context/ThemeContext";
import { projectFirestore } from "../firebase/config";

type RecipeListType = {
  recipes: RecipesType[];
};

export default function RecipeList({ recipes }: RecipeListType) {
  const { mode } = useContext(ThemeContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const deleteData = async (id: string) => {
    try {
      await projectFirestore.collection("recipes").doc(id).delete();
      setIsSubmitted(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
          <img
            className="delete"
            src={DeleteIcon}
            alt="delete icon"
            onClick={() => deleteData(`${recipe.id}`)}
          />
        </div>
      ))}
    </div>
  );
}
