import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/components/App";

import "@/styles/globals.css";
import "@/styles/variables.css";

const root = document.getElementById("root");
if (root === null) {
  throw new Error("root element is not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
