import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CabAppContextProvider from "./context/CabAppContext.jsx";
// import { DriverContextProvider } from "./context/DriverContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CabAppContextProvider>
        <App />
    </CabAppContextProvider>
  </StrictMode>
);
