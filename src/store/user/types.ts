import { Driver } from "@interfaces/models/driver.interface";

interface UserStore extends Partial<Driver> {
  type: "passenger" | "driver";
  fetched: boolean;
  user: Partial<Driver> | null;
  syncUser: (user: Driver) => void;
}

export default UserStore;
