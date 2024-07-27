import { useSelector } from "@hooks";
import DriverView from "./DriverView";
import PassengerView from "./PassengerView";

export default function RequestDetail() {
  const { type } = useSelector((state) => state.user);

  return <div>{type === "driver" ? <DriverView /> : <PassengerView />}</div>;
}
