import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import createThemeSlice from "./theme/theme.store";
import { StoreType } from "./types";
import createSignUpSlice from "./signup/signup.store";
import createUserSlice from "./user/user.store";
import createTravelSlice from "./travel/travel.store";
import createNotificationSlice from "./notifications/notifications.store";

const storageOptions = {
  name: "store",
  partialize: (state: StoreType) => {
    const { blur, ...rest } = state;
    return rest;
  },
};
const useStore = create<StoreType>()(
  devtools(
    persist(
      (...a) => ({
        ...createThemeSlice(...a),
        ...createSignUpSlice(...a),
        ...createUserSlice(...a),
        ...createTravelSlice(...a),
        ...createNotificationSlice(...a),
      }),
      storageOptions
    )
  )
);

export default useStore;
