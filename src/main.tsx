import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { RequestProvider } from "./context/RequestContext";
import { FilterProvider } from "./context/FilterContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RequestProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </RequestProvider>
  </AuthProvider>
);
