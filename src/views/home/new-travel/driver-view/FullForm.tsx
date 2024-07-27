import moment from "moment";
import { getDefaultDirectionValue, getNextIntervalTime } from "../utils";
import { useSelector } from "@hooks";
import { TravelDirection } from "@interfaces/enums/TravelDirection";

export default function FullForm() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <label className="col-span-2 flex flex-col">
        Asientos reservados
        <input
          type="number"
          name="bookedSeats"
          id="bookedSeats"
          className="input input-bordered"
          min={0}
          max={user?.seats! - 1}
          defaultValue={0}
          required
        />
      </label>
      <label htmlFor="fee" className="col-span-2 flex flex-col">
        Tarifa S/.
        <input
          className="input input-bordered w-full"
          type="number"
          min={0}
          step={0.5}
          name="fee"
          id="fee"
          defaultValue={user?.fee!.toFixed(2)}
          required
        />
      </label>
      <label htmlFor="travelDay" className="col-span-2 flex flex-col">
        Fecha
        <input
          className="input input-bordered w-full"
          type="date"
          min={moment().format("YYYY-MM-DD")}
          name="travelDay"
          id="travelDay"
          defaultValue={moment().format("YYYY-MM-DD")}
          required
        />
      </label>
      <label htmlFor="timeTravel" className="col-span-2 flex flex-col">
        Hora
        <input
          type="time"
          name="travelTime"
          id="travelTime"
          className="input input-bordered"
          step={60 * 10}
          defaultValue={getNextIntervalTime()}
          required
        />
      </label>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Ida</span>
          <input
            type="radio"
            name="direction"
            className="radio radio-primary"
            value={TravelDirection.INBOUND}
            defaultChecked={
              getDefaultDirectionValue() === TravelDirection.INBOUND
            }
            required
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Vuelta</span>
          <input
            type="radio"
            name="direction"
            className="radio radio-primary"
            value={TravelDirection.OUTBOUND}
            defaultChecked={
              getDefaultDirectionValue() === TravelDirection.OUTBOUND
            }
            required
          />
        </label>
      </div>
    </>
  );
}
