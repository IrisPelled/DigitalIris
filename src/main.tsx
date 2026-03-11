import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

/** Basename for GitHub Pages: /RepoName or "" when running at root (e.g. local dev). */
function getPagesBasename(): string {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  if (path === "/" || path === "") return "";
  const match = path.match(/^\/([^/]+)/);
  return match ? `/${match[1]}` : "";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={getPagesBasename()}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
