export const TravelState = {
  CREATED: "CREATED",
  CANCELLED: "CANCELLED",
  OFF: "OFF",
} as const;

export type TravelState = (typeof TravelState)[keyof typeof TravelState];
