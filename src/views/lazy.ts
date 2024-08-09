import { lazy } from "react";

const LazySignUp = lazy(() => import("./sign-up"));
const LazyHome = lazy(() => import("./home"));
const LazyHistory = lazy(() => import("./history"));
const LazyHistoryDetail = lazy(() => import("./history/detail"));
export { LazySignUp, LazyHome, LazyHistory, LazyHistoryDetail };
