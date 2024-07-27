import moment from "moment";
import {
  getDefaultDirectionValue,
  getNextIntervalTime,
} from "./utils";
import { TravelDirection } from "@interfaces/enums/TravelDirection";

export default function SimpleForm() {
  const isAfter10PM = moment().hour() >= 22;
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");

  return (
    <>
      <label htmlFor="" className="col-span-2">
        <select
          name="day"
          id="day"
          className="select select-bordered w-full max-w-xs"
          defaultValue={isAfter10PM ? tomorrow : today}
          required
        >
          <option value={today}>Hoy</option>
          <option value={tomorrow}>Mañana</option>
        </select>
      </label>
      <label htmlFor="timeTravel" className="col-span-2 flex flex-col">
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
