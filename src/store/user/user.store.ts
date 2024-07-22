import { SliceStore } from "@store/types";
import UserStore from "./types";
import { Driver } from "@interfaces/models/driver.interface";

const createUserSlice: SliceStore<UserStore> = (set, get) => ({
  type: "driver",
  fetched: false,
  user: null,
  syncUser: (user: Partial<Driver> | null) => {
    if (!get().fetched) set((state) => ({ ...state, user, fetched: true }));
  },
});

export default createUserSlice;
