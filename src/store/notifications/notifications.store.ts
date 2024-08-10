import { SliceStore } from "../types";
import { NotificationStore } from "./types";

const createNotificationSlice: SliceStore<NotificationStore> = (set) => ({
  newTravel: false,
  turnOnNotification: (notificationKey) => {
    set(() => ({
      [notificationKey]: true,
    }));
  },
  resetNotification: (notificationKey) => {
    set(() => ({ [notificationKey]: false } as NotificationStore));
  },
});

export default createNotificationSlice;
