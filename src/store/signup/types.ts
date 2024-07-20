export interface SignUpStore {
  createUserData: SignUpData | null;
  setZone: (zoneID: number) => void;
  setUserData: (data: Partial<SignUpData>) => void;
}

export type SignUpData = {
  userId: string;
  zoneId: number;
  role: "driver" | "passenger";
};
