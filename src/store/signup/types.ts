import { User } from "@interfaces/models/user.interface";

export interface SignUpStore {
  createUserData: UserData | null;
  setZone: (zoneID: string) => void;
  setUserData: (data: UserData) => void;
}

export type UserData = Pick<
  User,
  "name" | "lastname" | "email" | "faculty" | "code" | "zoneId"
> & { role: "driver" | "passenger" };
