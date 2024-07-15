import { create } from "zustand";
import { persist } from "zustand/middleware";

import createThemeSlice from "./theme/theme.store";
import { StoreType } from "./types";

const storageOptions = {
  name: "store",
};
const useStore = create<StoreType>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
    }),
    storageOptions
  )
);

export default useStore;
