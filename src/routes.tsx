import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { LazyHome, LazySignUp } from "./views/lazy";
import AuthProvider from "./contexts/AuthProvider";
import Paths from "@constants/paths.constants";

const router = createBrowserRouter([
  {
    element: <MainLayout simple />,
    children: [
      {
        path: Paths.SING_UP,
        element: <LazySignUp />,
      },
    ],
  },
  {
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to={Paths.HOME} />,
      },
      {
        path: Paths.HOME,
        element: <LazyHome />,
      },
      {
        path: Paths.HISTORY,
        element: <div>History</div>,
      },
      {
        path: Paths.PROFILE,
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
