import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import createThemeSlice from "./theme/theme.store";
import { StoreType } from "./types";
import createSignUpSlice from "./signup/signup.store";

const storageOptions = {
  name: "store",
};
const useStore = create<StoreType>()(
  devtools(
    persist(
      (...a) => ({
        ...createThemeSlice(...a),
        ...createSignUpSlice(...a),
      }),
      storageOptions
    )
  )
);

export default useStore;
