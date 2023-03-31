import React, { useState } from "react";
import { useEffect } from "react";
import RecipeList from "../../components/RecipeList";
import { IError } from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";

import "./home.css";

export type RecipesType = {
  id?: string;

  title: string;
  method: string;
  ingredients: string[];
  cookingTime: string;
};

export default function Home() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<IError>({ name: "", message: "" });
  const [recipes, setRecipes] = useState<RecipesType[]>([]);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError({
            name: "Firestore collection error",
            message: "No recipes to load.",
          });
          setIsPending(false);
        } else {
          let results: RecipesType[] = [];
          snapshot.forEach((doc) => {
            const dataObj = doc.data();
            //console.log(doc.id);

            results.push({
              id: doc.id,
              title: dataObj.title,
              method: dataObj.method,
              cookingTime: dataObj.cookingTime,
              ingredients: dataObj.ingredients,
            });
          });
          setRecipes(results);
          setIsPending(false);
        }
      },
      (err) => {
        console.log(err.message);
        setError({ message: err.message });
        setIsPending(false);
      }
    );
    //clean up
    return () => unsub();
  }, []);

  return (
    <div className="home">
      <h1>Welcome to RecipeHub</h1>
      <em>your one stop shop to demystifying every delicacy</em>
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="">Loading...</p>}
      {recipes && <RecipeList recipes={recipes as RecipesType[]} />}
    </div>
  );
}
