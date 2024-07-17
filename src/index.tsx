import "./index.css";
import { createRoot } from "react-dom/client";
import { Main } from "./main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./contexts/ThemeProvider";

const container = document.querySelector("#root");
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  </QueryClientProvider>
);
