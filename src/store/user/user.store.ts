import { SliceStore } from "@store/types";
import UserStore from "./types";
import type { Driver } from "@interfaces/models/driver.d.ts";
import type { Passenger } from "@interfaces/models/passenger.d.ts";
import type { User } from "@interfaces/models/user";

const createUserSlice: SliceStore<UserStore> = (set) => ({
  type: "",
  user: {} as unknown as Driver | Passenger,
  syncUser: (user: Partial<Driver> | Partial<Passenger> | null) => {
    set((state) => ({ ...state, user, fetched: true }));
  },
  setCode: (code: User["code"]) => {
    set((state) => ({ ...state, user: { ...state.user, code } }));
  },
  setType: (type: "passenger" | "driver") => {
    set((state) => ({ ...state, type }));
  },
});

export default createUserSlice;
