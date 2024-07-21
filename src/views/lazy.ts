import { lazy } from "react";

const LazySignUp = lazy(() => import("./sign-up"));
const LazyHome = lazy(() => import("./home"));
export { LazySignUp, LazyHome };
