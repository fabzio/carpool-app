import { ThemeStore } from "@store/theme/types";
import { StoreType } from "@store/types";
import useStore from "@store/index";
import { SignUpStore } from "@store/signup/types";
import UserStore from "@store/user/types";
import TravelStore from "@store/travel/types";
import { NotificationStore } from "@store/notifications/types";

interface GlobalStore {
  theme: ThemeStore;
  signUp: SignUpStore;
  user: UserStore;
  travel: TravelStore;
  notification: NotificationStore;
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
      user: useStore((state: StoreType) => state.user),
      syncUser: useStore((state: StoreType) => state.syncUser),
      setCode: useStore((state: StoreType) => state.setCode),
      setType: useStore((state: StoreType) => state.setType),
      resetUser: useStore((state: StoreType) => state.resetUser),
    } as UserStore,

    travel: {
      selectedTravel: useStore((state: StoreType) => state.selectedTravel),
      setSelectedTravel: useStore(
        (state: StoreType) => state.setSelectedTravel
      ),
    } as TravelStore,

    notification: {
      newTravel: useStore((state: StoreType) => state.newTravel),
      resetNotification: useStore(
        (state: StoreType) => state.resetNotification
      ),
      turnOnNotification: useStore(
        (state: StoreType) => state.turnOnNotification
      ),
    } as NotificationStore,
  };
  return selector(global);
};

export default useSelector;
