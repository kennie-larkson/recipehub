import React, { createContext } from "react";
import { useState } from "react";

type ThemeContextType = {
  color: string;
};

const ThemeContext = createContext<ThemeContextType>({ color: "" });

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export function ThemeProvider({ children }: Props) {
  const [color, setColor] = useState<ThemeContextType>({ color: "purple" });

  return (
    <ThemeContext.Provider value={color}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContext;
