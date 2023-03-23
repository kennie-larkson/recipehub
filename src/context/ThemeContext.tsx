import React, { createContext, useReducer } from "react";

interface ThemeContextType {
  color: string;
  changeColor: (color: string) => void;
  mode: string;
  changeMode: (mode: string) => void;
}
enum ThemeActionType {
  CHANGE_COLOR = "CHANGE_COLOR",
  CHANGE_MODE = "CHANGE_MODE",
}

interface ThemeAction {
  type: ThemeActionType;
  payload: string;
}

const ThemeContext = createContext<ThemeContextType>({
  color: "",
  changeColor: () => {},
  mode: "",
  changeMode: () => {},
});

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const themeContextReducer = (state: ThemeContextType, action: ThemeAction) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };

    case "CHANGE_MODE":
      return { ...state, mode: action.payload };

    default:
      return state;
  }
};

export function ThemeProvider({ children }: Props) {
  const [state, dispatch] = useReducer(themeContextReducer, {
    color: "purple",
    changeColor: () => {},
    mode: "light",
    changeMode: () => {},
  });

  const changeColor = (color: string) => {
    dispatch({ type: ThemeActionType.CHANGE_COLOR, payload: `${color}` });
  };

  const changeMode = (mode: string) => {
    dispatch({ type: ThemeActionType.CHANGE_MODE, payload: `${mode}` });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
