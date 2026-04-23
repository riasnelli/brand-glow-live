import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

window.requestAnimationFrame(() => {
  const bootSkeleton = document.getElementById("boot-skeleton");
  if (!bootSkeleton) return;

  bootSkeleton.classList.add("boot-ready");
  window.setTimeout(() => bootSkeleton.remove(), 240);
});
