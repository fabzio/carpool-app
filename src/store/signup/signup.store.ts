import { SliceStore } from "../types";
import { SignUpData, SignUpStore } from "./types";

const createSignUpSlice: SliceStore<SignUpStore> = (set, get) => ({
  createUserData: null,
  setZone: (zoneId: number) => {
    set(() => ({
      createUserData: {
        ...get().createUserData,
        zoneId: zoneId,
      } as SignUpStore["createUserData"],
    }));
  },

  setUserData: (data: Partial<SignUpData>) => {
    set(() => ({
      createUserData: {
        ...get().createUserData,
        ...data,
      } as SignUpStore["createUserData"],
    }));
  },
});

export default createSignUpSlice;
