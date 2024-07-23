import { ThemeStore } from "@store/theme/types";
import { StoreType } from "@store/types";
import useStore from "@store/index";
import { SignUpStore } from "@store/signup/types";
import UserStore from "@store/user/types";

interface GlobalStore {
  theme: ThemeStore;
  signUp: SignUpStore;
  user: UserStore;
}
const useSelector = <T>(selector: (state: GlobalStore) => T): T => {
  const global: GlobalStore = {
    theme: {
      theme: useStore((state: StoreType) => state.theme),
      themeChosen: useStore((state: StoreType) => state.themeChosen),
      blur: useStore((state: StoreType) => state.blur),
      switchBlur: useStore((state: StoreType) => state.switchBlur),
      switchTheme: useStore((state: StoreType) => state.switchTheme),
    } as ThemeStore,

    signUp: {
      createUserData: useStore((state: StoreType) => state.createUserData),
      setZone: useStore((state: StoreType) => state.setZone),
      setUserData: useStore((state: StoreType) => state.setUserData),
    } as SignUpStore,

    user: {
      type: useStore((state: StoreType) => state.type),
      fetched: useStore((state: StoreType) => state.fetched),
      user: useStore((state: StoreType) => state.user),
      syncUser: useStore((state: StoreType) => state.syncUser),
    } as UserStore,
  };
  return selector(global);
};

export default useSelector;
