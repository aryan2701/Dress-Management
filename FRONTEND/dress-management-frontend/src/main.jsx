import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/risingsun">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <App />
    </BrowserRouter>
  </StrictMode>
);
