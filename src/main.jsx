import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";  // ← AGREGAR

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>      {/* ← AGREGAR */}
      <App />
    </AuthProvider>    {/* ← AGREGAR */}
  </React.StrictMode>
);