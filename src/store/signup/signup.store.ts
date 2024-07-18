import { SliceStore } from "../types";
import { SignUpStore } from "./types";

const createSignUpSlice: SliceStore<SignUpStore> = (set, get) => ({
  createUserData: null,

  setZone: (zoneID: string) => {
    set(() => ({
      createUserData: {
        ...get().createUserData,
        zoneId: zoneID,
      } as SignUpStore["createUserData"],
    }));
  },

  setUserData: (data) => {
    set(() => ({
      createUserData: {
        ...get().createUserData,
        ...data,
      } as SignUpStore["createUserData"],
    }));
  }
});

export default createSignUpSlice;
