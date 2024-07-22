import { StateCreator } from "zustand";

import { ThemeStore } from "./theme/types";
import { SignUpStore } from "./signup/types";
import UserStore from "./user/types";

export type SliceStore<T> = StateCreator<StoreType, [], [], T>;
export type StoreType = ThemeStore & SignUpStore & UserStore;
