import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CargarMasData } from "./CargarMasData";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CargarMasData url={"https://dummyjson.com/products"} />
  </StrictMode>
);
