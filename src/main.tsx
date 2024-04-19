import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MobileProvider } from "./context/mobileContext.tsx";
import { UserContextProvider } from "@context/UserContext/Index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MobileProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
    </MobileProvider>
  </React.StrictMode>
);
