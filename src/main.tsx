// enable the v7 relative-splat path behavior early for react-router
;(window as any).__react_router_future_flags__ = { v7_relativeSplatPath: true };

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
