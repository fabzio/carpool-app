import { useSelector } from "@hooks";
import type { Passenger } from "@interfaces/models/passenger";

interface Props {
  updateMode: boolean;
}
export default function PassengerProfile({ updateMode }: Props) {
  const passenger = useSelector((state) => state.user).user as Passenger;
  return (
    <>
      <div className="col-span-2 flex flex-col">
        <label htmlFor="">Referencia de Paradero</label>
        <textarea
          className="textarea"
          name="pickUpPoint"
          maxLength={100}
          defaultValue={passenger.pickUpPoint}
          disabled={!updateMode}
          required
        />
      </div>
    </>
  );
}
