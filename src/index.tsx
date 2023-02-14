import React, { StrictMode } from "react";
//import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
