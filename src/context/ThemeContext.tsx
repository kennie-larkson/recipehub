import React, { createContext, useReducer } from "react";

interface ThemeContextType {
  color: string;
  changeColor: (color: string) => void;
}
enum ThemeActionType {
  CHANGE_COLOR = "CHANGE_COLOR",
}

interface ThemeAction {
  type: ThemeActionType;
  payload: string;
}

const ThemeContext = createContext<ThemeContextType>({
  color: "",
  changeColor: () => {},
});

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const themeContextReducer = (state: ThemeContextType, action: ThemeAction) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };

    default:
      return state;
  }
};

export function ThemeProvider({ children }: Props) {
  const [state, dispatch] = useReducer(themeContextReducer, {
    color: "purple",
    changeColor: () => {},
  });

  const changeColor = (color: string) => {
    dispatch({ type: ThemeActionType.CHANGE_COLOR, payload: `${color}` });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
