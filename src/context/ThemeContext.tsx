import React, { createContext } from "react";
import { useState } from "react";

const ThemeContext = createContext({});

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export function ThemeProvider({ children }: Props) {
  const [color, setColor] = useState("blue");

  return (
    <ThemeContext.Provider value={color}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContext;
