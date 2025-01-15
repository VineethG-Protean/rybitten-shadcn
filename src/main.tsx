import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StyleProvider } from "./components/providers/style-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleProvider>
      <App />
    </StyleProvider>
  </StrictMode>
);
