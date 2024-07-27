import { User } from "./user";

interface Driver extends User {
  dni: string;
  plate: string;
  vehicleDescription: string;
  route: string;
  fee: number;
  seats: number;
}
