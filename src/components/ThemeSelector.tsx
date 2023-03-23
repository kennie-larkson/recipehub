import React from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import modeIcon from "../ assets/mode.svg";
import "./themeselector.css";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

function ThemeSelector() {
  const { changeColor, changeMode, mode } = useThemeContext();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  console.log(mode);

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="mode icon"
          onClick={toggleMode}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
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
