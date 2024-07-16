export const UserState = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
} as const;

export type UserState = (typeof UserState)[keyof typeof UserState];
