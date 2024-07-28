type GenericTravel = {
  travelId: string;
  userCode?: string;
  fee?: number;
  travelType: "offer" | "request";
  seats?: number;
  freeSeats?: number;
  name: string;
  direction: boolean;
  travelDate: string;
  numPassengers?: number;
  forSelf?: boolean;
  customPoint?: string;
  preview?: boolean;
  selected?: boolean;
};
