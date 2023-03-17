import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

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

  const fields = { title, method, cookingTime, ingredients };

  const ingredientInputRef = useRef<HTMLInputElement>(null);
  //const history = useHistory();

  const { postData, recipes } = useFetch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postData({
      url: "http://localhost:3000/recipes",
      fields,
      httpMethod: "POST",
    });
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

  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, [recipes]);

  //   useEffect(() => {
  //     if (recipe) {
  //       history.push("/");
  //     }
  //   }, [recipe]);

  return (
    <div className="create">
      {/* {isSubmitted && <Redirect push to="/" />} */}
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
            value={fields.method}
            name="method"
            required
          />
        </label>
        <label>
          <span> Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={fields.cookingTime}
            name="cookingTime"
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
