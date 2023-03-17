import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider children={undefined}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <StrictMode>
//     <ThemeProvider children={undefined}>
//       <App />
//     </ThemeProvider>
//   </StrictMode>,
//   document.getElementById("root")
// );
