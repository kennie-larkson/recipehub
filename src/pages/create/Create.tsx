import React, { useState, useRef } from "react";
import useFetch from "../../hooks/useFetch";

import "./create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const ingredientInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle("");
    setCookingTime("");
    setMethod("");
    setIngredients([]);
    console.log(title, method, cookingTime, ingredients);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredient = newIngredient.trim();

    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }

    setNewIngredient("");
    if (ingredientInputRef.current != null) {
      ingredientInputRef.current.focus();
    }
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span> Recipe Title:</span>
          <input
            type="text"
            name=""
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
            required
          />
        </label>
        <label>
          <span> Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
