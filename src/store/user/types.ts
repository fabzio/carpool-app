import type { Driver } from "@interfaces/models/driver.d.ts";

interface UserStore {
  type: "passenger" | "driver";
  fetched: boolean;
  user: Partial<Driver> | null;
  syncUser: (user: Driver) => void;
}

export default UserStore;
