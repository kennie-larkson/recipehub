import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import "./create.css";

export interface IRecipe {
  id?: string;
  title: string;
  ingredients: string[];
  cookingTime: string;
  method: string;
}

export interface IRequest {
  url: string;
  fields?: IRecipe;
  httpMethod: string;
}

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fields = {
    title,
    method,
    cookingTime: cookingTime + " minutes",
    ingredients,
  };

  const ingredientInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await projectFirestore.collection("recipes").add(fields);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitted(true);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredient = newIngredient.trim();

    if (ingredient && !fields.ingredients.includes(ingredient)) {
      setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }

    setNewIngredient("");
    if (ingredientInputRef.current != null) {
      ingredientInputRef.current.focus();
    }
  };

  return (
    <div className="create">
      {isSubmitted && <Navigate to="/" />}
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span> Recipe Title:</span>
          <input
            type="text"
            name="title"
            id=""
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        {/* ingredients go here */}

        <label>
          <span>Recipe Ingredients: </span>
          <div className="ingredients">
            <input
              ref={ingredientInputRef}
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              name="ingredient"
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
          <p>
            Current ingredients:{" "}
            {ingredients.map((ingredient) => (
              <em key={ingredient}>{ingredient},</em>
            ))}
          </p>
        </label>

        <label>
          <span> Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            name="method"
            required
          />
        </label>
        <label>
          <span> Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            name="cookingTime"
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
