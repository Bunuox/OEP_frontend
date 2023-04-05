import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StudentAuthProvider } from "./components/context/AuthStudentContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <StudentAuthProvider>
      <App />
    </StudentAuthProvider>
  </BrowserRouter>
);
