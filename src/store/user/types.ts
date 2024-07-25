import { Driver } from "@interfaces/models/driver.interface";

interface UserStore {
  type: "passenger" | "driver";
  fetched: boolean;
  user: Partial<Driver> | null;
  syncUser: (user: Driver) => void;
}

export default UserStore;
