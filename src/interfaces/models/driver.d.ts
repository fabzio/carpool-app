import { User } from "./user";

interface Driver extends User {
  dni: string;
  plate: string;
  vehicleDescription: string;
  routeIn: string;
  routeOut: string;
  fee: number;
  seats: number;
}
