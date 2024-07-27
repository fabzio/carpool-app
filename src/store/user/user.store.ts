import { SliceStore } from "@store/types";
import UserStore from "./types";
import type { Driver } from "@interfaces/models/driver.d.ts";

const createUserSlice: SliceStore<UserStore> = (set, get) => ({
  type: "driver",
  fetched: false,
  user: {
    route: "Todo javier prado",
    fee: 5,
    seats: 4,
    name: "FABRIZIO",
  } as Driver,
  syncUser: (user: Partial<Driver> | null) => {
    if (!get().fetched) set((state) => ({ ...state, user, fetched: true }));
  },
});

export default createUserSlice;
