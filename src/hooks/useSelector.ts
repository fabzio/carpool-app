import { ThemeStore } from "@store/theme/types";
import { StoreType } from "@store/types";
import useStore from "@store/index";
import { SignUpStore } from "@store/signup/types";

interface GlobalStore {
  theme: ThemeStore;
  signUp: SignUpStore;
}
const useSelector = <T>(selector: (state: GlobalStore) => T): T => {
  const global: GlobalStore = {
    theme: {
      theme: useStore((state: StoreType) => state.theme),
      themeChosen: useStore((state: StoreType) => state.themeChosen),
      switchTheme: useStore((state: StoreType) => state.switchTheme),
    },

    signUp: {
      createUserData: useStore((state: StoreType) => state.createUserData),
      setZone: useStore((state: StoreType) => state.setZone),
    },
  };
  return selector(global);
};

export default useSelector;
