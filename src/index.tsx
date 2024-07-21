import "./index.css";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./contexts/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const container = document.querySelector("#root");
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
