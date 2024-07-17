import { Driver } from "@interfaces/models/driver.interface";
import { User } from "@interfaces/models/user.interface";

export interface SignUpStore {
  createUserData: User | Driver | null;
  setZone: (zoneID: string) => void;
}
