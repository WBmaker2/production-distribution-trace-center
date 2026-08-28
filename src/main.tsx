import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/tokens.css";
import "./styles/app.css";
import "./styles/workbench.css";
import "./styles/motion.css";
import "./features/report/print.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("root 요소를 찾을 수 없습니다");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
