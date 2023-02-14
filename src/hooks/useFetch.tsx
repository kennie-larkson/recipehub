import React, { useEffect, useState } from "react";

type DataType = {
  id: string;
  title: string;
  ingredients: string[];
  cookingTime: string;
};

export default function useFetch(url: string) {
  const [data, setData] = useState<DataType[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw Error(res.statusText);
        }
        const data = await res.json();

        setIsPending(false);
        setData(data);
        setError("");
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("The fetch was aborted.");
          } else {
            setIsPending(false);
            setError("Could not fetch the data");
          }
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, isPending, error };
}
