import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { LazyHome, LazySignUp } from "./views/lazy";
import AuthProvider from "./contexts/AuthProvider";

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
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
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
