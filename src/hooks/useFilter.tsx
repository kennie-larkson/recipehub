import React from "react";
import { useState } from "react";

import { IRecipe } from "../hooks/useFetch";

type FilterType = {
  recipes: IRecipe[];
  keyword: string;
};

function useFilter({ recipes, keyword }: FilterType) {
  //   const [filters, setFilters] = useState<IRecipe[]>();
  //   if (recipes && keyword) {
  //     const entries = recipes.filter((recipe) => recipe.title.includes(keyword));
  //     setFilters(entries);
  //   }
  //   return { filters };
}

export default useFilter;
