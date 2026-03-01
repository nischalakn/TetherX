import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { RequestProvider } from "./context/RequestContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RequestProvider>
      <App />
    </RequestProvider>
  </AuthProvider>
);
