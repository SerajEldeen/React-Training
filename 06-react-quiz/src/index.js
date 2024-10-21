import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QuizProvider } from "./contexts/QuizProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <QuizProvider>
      <App />
    </QuizProvider>
  </>
);
