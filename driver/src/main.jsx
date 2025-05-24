// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DriverAppContextProvider from "./context/DriverContext.jsx";
// import { DriverContextProvider } from '../../client/src/context/DriverContext.jsx'

createRoot(document.getElementById("root")).render(
  <>
    <DriverAppContextProvider>
      <App />
    </DriverAppContextProvider>
  </>
);
