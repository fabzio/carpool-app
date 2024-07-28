import type { Driver } from "@interfaces/models/driver.d.ts";
import type { Passenger } from "@interfaces/models/passenger.d.ts";

interface UserStore {
  type: "passenger" | "driver";
  fetched: boolean;
  user: Partial<Driver> | Partial<Passenger> | null;
  syncUser: (user: Driver | Passenger) => void;
}

export default UserStore;
