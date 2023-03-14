import React, { StrictMode } from "react";

import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.render(
  <StrictMode>
    <ThemeProvider children={undefined}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);
