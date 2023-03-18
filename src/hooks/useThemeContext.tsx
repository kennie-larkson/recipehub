import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (themeContext === undefined) {
    throw new Error(
      "useThemeContext() must be used inside a ThemeContextProvider"
    );
  }
  return themeContext;
};
