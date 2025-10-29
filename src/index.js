import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// 🔹 Get the HTML element with id="root" from index.html
const rootElement = document.getElementById("root");

// 🔹 Create a React root (new API for rendering in React 18+)
const root = createRoot(rootElement);

// 🔹 Render the entire App component inside <StrictMode> (helps detect issues)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
