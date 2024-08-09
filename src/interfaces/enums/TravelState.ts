export const TravelState = {
  CREATED: "CREATED",
  CANCELLED: "CANCELED",
  OFF: "OFF",
  WAITING: "WAITING",
} as const;

export type TravelState = (typeof TravelState)[keyof typeof TravelState];
