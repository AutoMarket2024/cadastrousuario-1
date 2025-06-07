import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesComponent from "./pages/Routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoutesComponent />
  </StrictMode>
);
