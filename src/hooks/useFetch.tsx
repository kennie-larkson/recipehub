import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface IRecipe {
  id?: string;
  title: string;
  ingredients: string[];
  cookingTime: string;
  method: string;
}

export interface IError {
  name: string;
  message: string;
}

export default function useFetch(url: string, method: string = "GET") {
  const { id } = useParams<{ id: string }>();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const [recipe, setRecipe] = useState<IRecipe>({
    id: "",
    title: "",
    ingredients: [],
    cookingTime: "",
    method: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<IError>({ name: "", message: "" });
  const [options, setOptions] = useState({});

  const postData = (postData: {}) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions: {}) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        if (!res.ok) {
          throw Error(res.statusText);
        }
        const data = await res.json();

        setIsPending(false);
        if (!id) {
          setRecipes(data);
        } else {
          setRecipe(data);
        }

        setError({ name: "", message: "" });
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("The fetch was aborted.");
          } else {
            setIsPending(false);
            setError({ message: "Could not fetch the data", name: "" });
          }
        } else {
          setIsPending(false);
          setError({ message: "Could not fetch the data", name: "" });
        }
      }
    };

    if (method === "GET") {
      fetchData({});
    }

    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);
  return { recipes, recipe, isPending, error, postData };
}
