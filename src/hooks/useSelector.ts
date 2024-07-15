import { ThemeStore } from "@store/theme/types";
import { StoreType } from "@store/types";
import useStore from "@store/index";

interface GlobalStore {
  theme: ThemeStore;
}
const useSelector = <T>(selector: (state: GlobalStore) => T): T => {
  const global: GlobalStore = {
    theme: {
      theme: useStore((state: StoreType) => state.theme),
      themeChosen: useStore((state: StoreType) => state.themeChosen),
      switchTheme: useStore((state: StoreType) => state.switchTheme),
    },
  };
  return selector(global);
};

export default useSelector;
