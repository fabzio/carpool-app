import { UserState } from "@interfaces/enums/UserState";

interface User {
  id: string;
  name: string;
  lastname: string;
  faculty: string;
  code: string;
  phone: string;
  degree?: string;
  password: string;
  email: string;
  state: UserState;
  zoneId: number;
  createdAt: Date;
}
