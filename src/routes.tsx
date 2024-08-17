import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import {
  LazyHistory,
  LazyHistoryDetail,
  LazyHome,
  LazySelectRole,
  LazySignUp,
  LazySingIn,
} from "./views/lazy";
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
      {
        path: Paths.SING_IN,
        element: <LazySingIn />,
      },
      {
        path: Paths.CHOOSE_ROLE,
        element: <LazySelectRole />,
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
        element: <LazyHistory />,
      },

      {
        path: Paths.HISTORY_DETAIL,
        element: <LazyHistoryDetail />,
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
],
{
  basename: "/Carpool"
});

export default router;
