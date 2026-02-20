import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { DealProvider } from "./context/DealContext";
import { MessageProvider } from "./context/MessageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <DealProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </DealProvider>
    </ThemeProvider>
  </React.StrictMode>
);