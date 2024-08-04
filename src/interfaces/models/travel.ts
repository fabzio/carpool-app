import { TravelState } from "@interfaces/enums/TravelState";

export interface Travel {
  id: string;
  name: string;
  type?: "offer" | "request";
  travelDate: string;
  direction: boolean;
  state: TravelState;
}

export interface TravelOffer extends Travel {
  customFee?: number;
  freeSeats: number;
  driverId: string;
}

export interface TravelRequest extends Travel {
  driverId?: string;
  passengerId: string;
}
