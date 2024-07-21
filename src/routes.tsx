import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { LazySignUp } from "./views/lazy";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/signup",
        element: <LazySignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default router;
