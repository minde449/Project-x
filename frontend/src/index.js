import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QuestionsContextProvider } from "./context/QuestionContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QuestionsContextProvider>
        <App />
      </QuestionsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
