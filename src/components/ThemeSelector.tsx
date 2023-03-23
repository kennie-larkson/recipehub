import React from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import "./themeselector.css";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

function ThemeSelector() {
  const { changeColor } = useThemeContext();
  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            className=""
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
