interface Travel {
  id: string;
  travelDate: string;
  direction: boolean;
}

interface TravelOffer extends Travel {
  customFee?: number;
  state: string;
  freeSeats: number;
  driverId: string;
}

interface TravelRequest extends Travel {
  driverId?: string;
  passengerId: string;
}
