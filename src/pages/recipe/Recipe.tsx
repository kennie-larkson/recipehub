import React, { useEffect, useState } from "react";
import "./recipe.css";
import { useParams, Link } from "react-router-dom";
import deleteIcon from "../../ assets/delete-icon.svg";
import { Navigate } from "react-router-dom";

import { IError } from "../../hooks/useFetch";
import { useThemeContext } from "../../hooks/useThemeContext";
import { RecipesType } from "../home/Home";
import { projectFirestore } from "../../firebase/config";
import { log } from "console";

export default function Recipe() {
  const { id } = useParams<{ id: string }>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<IError>({ name: "", message: "" });
  const [recipe, setRecipe] = useState<RecipesType>({
    title: "",
    method: "",
    cookingTime: "",
    ingredients: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mode } = useThemeContext();

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          setError({
            name: "Firestore collection error",
            message: "Could not find that recipe.",
          });
          setIsPending(false);
        } else {
          setIsPending(false);

          setRecipe({
            title: doc.data()?.title,
            method: doc.data()?.method,
            ingredients: doc.data()?.ingredient,
            cookingTime: doc.data()?.cookingTime,
          });
        }
      });

    return () => unsub();
  }, [id]);

  const handleClick = () => {
    projectFirestore
      .collection("recipes")
      .doc(id)
      .update({ title: "Another Title update" });
  };

  return (
    <div className={`recipe ${mode}`}>
      {isSubmitted && <Navigate to="/" />}
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe.title !== "" && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me </button>
        </>
      )}

      <Link to="/" style={{ textDecoration: "none" }}>
        Go back
      </Link>
    </div>
  );
}
