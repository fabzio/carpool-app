import { SliceStore } from "@store/types";
import UserStore from "./types";
import type { Driver } from "@interfaces/models/driver.d.ts";
import type { Passenger } from "@interfaces/models/passenger.d.ts";

const createUserSlice: SliceStore<UserStore> = (set, get) => ({
  type: "passenger",
  fetched: false,
  user: {
    route: "Todo javier prado",
    pickUpPoint: "Av. Javier Prado 123",
    fee: 5,
    seats: 4,
    name: "FABRIZIO",
  } as unknown as Driver | Passenger,
  syncUser: (user: Partial<Driver> | null) => {
    if (!get().fetched) set((state) => ({ ...state, user, fetched: true }));
  },
});

export default createUserSlice;
