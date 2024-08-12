import { lazy } from "react";

const LazySignUp = lazy(() => import("./sign-up"));
const LazySingIn = lazy(() => import("./sign-in"));
const LazyHome = lazy(() => import("./home"));
const LazyHistory = lazy(() => import("./history"));
const LazyHistoryDetail = lazy(() => import("./history/detail"));

export { LazySignUp, LazyHome, LazyHistory, LazyHistoryDetail, LazySingIn };
