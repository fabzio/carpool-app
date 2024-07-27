import { useSelector } from "@hooks";
import DriverView from "./driver-view";
import PassengerView from "./passenger-view";

interface Props {
  handleClose: () => void;
}
export default function NewTravel({ handleClose }: Props) {
  const { type } = useSelector((state) => state.user);
  return (
    <div>
      {type === "driver" ? (
        <DriverView handleClose={handleClose} />
      ) : (
        <PassengerView handleClose={handleClose} />
      )}
    </div>
  );
}
