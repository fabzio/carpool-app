import type { Driver } from "@interfaces/models/driver.d.ts";
import type { Passenger } from "@interfaces/models/passenger.d.ts";

interface UserStore {
  type: "passenger" | "driver" | "";
  user: Partial<Driver> | Partial<Passenger> | null;
  syncUser: (user: Partial<Driver> | Partial<Passenger> | null) => void;
  setCode: (code: string) => void;
  setType: (type: "passenger" | "driver") => void;
}

export default UserStore;
