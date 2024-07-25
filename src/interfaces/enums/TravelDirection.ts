export const TravelDirection =  {
  OUTBOUND: 0,
  INBOUND: 1.
} as const;

export type TravelDirection = (typeof TravelDirection)[keyof typeof TravelDirection];