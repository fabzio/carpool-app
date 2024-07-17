import { UserState } from "@interfaces/enums/UserState";

export interface User {
  id: string;
  name: string;
  lastname: string;
  faculty: string;
  code: string;
  degree?: string;
  password: string;
  email: string;
  state: UserState;
  zoneId: string;
  createdAt: Date;
}
