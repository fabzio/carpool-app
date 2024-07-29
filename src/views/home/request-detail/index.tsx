import { useSelector } from "@hooks";
import DriverView from "./DriverView";
import PassengerView from "./PassengerView";

interface Props {
  handleClose: () => void;
}
export default function RequestDetail({ handleClose }: Props) {
  const { type } = useSelector((state) => state.user);

  return (
    <div>
      {type === "driver" ? (
        <DriverView />
      ) : (
        <PassengerView handleClose={handleClose} />
      )}
    </div>
  );
}
