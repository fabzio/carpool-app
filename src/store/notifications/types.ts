export interface NotificationStore {
  newTravel: boolean;
  turnOnNotification:(notificationKey: "newTravel") => void;
  resetNotification:(notificationKey: "newTravel") => void;
}