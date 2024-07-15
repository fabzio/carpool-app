import { SliceStore } from "../types";
import { ThemeStore } from "./types";

const createThemeSlice: SliceStore<ThemeStore> = (set, get) => ({
  theme: "light",
  themeChosen: false,
  switchTheme: () => {
    if (!get().themeChosen) {
      set(() => ({
        themeChosen: true,
      }));
    }
    set(() => ({
      theme: get().theme === "light" ? "dracula" : "light",
    }));
  },
});

export default createThemeSlice;
