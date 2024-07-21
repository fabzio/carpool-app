import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { LazyHome, LazySignUp } from "./views/lazy";

const router = createBrowserRouter([
  {
    element: <MainLayout simple />,
    children: [
      {
        path: "/signup",
        element: <LazySignUp />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <LazyHome />,
      },
      {
        path: "/history",
        element: <div>History</div>,
      },
      {
        path: "/profile",
        element: <div>Profile</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default router;
