import { TravelDirection } from "@interfaces/enums/TravelDirection";
import { getDefaultDirectionValue, getNextIntervalTime } from "./utils";
import { useSelector } from "@hooks";
import moment from "moment";
import { FieldValues, UseFormReturn } from "react-hook-form";
import type { Passenger } from "@interfaces/models/passenger.d.ts";

interface Props {
  formController: UseFormReturn<FieldValues, any, undefined>;
}
export default function PassengerFullForm({ formController }: Props) {
  const { register, watch } = formController;
  const { user } = useSelector((state) => state.user) as {
    user: Partial<Passenger>;
  };
  const isForMe = watch("forMe") ?? true;
  const direction = !!parseInt(
    watch("direction") ?? getDefaultDirectionValue()
  );
  console.log(direction);
  return (
    <>
      <label className="col-span-3 flex flex-col">
        <span className="label-text">
          Punto de {direction ? "recojo" : "destino"}
        </span>
        <textarea
          className="textarea textarea-bordered"
          {...register("customPoint")}
          name="customPoint"
          id="customPoint"
          defaultValue={user?.pickUpPoint}
        ></textarea>
      </label>
      <label className="col-span-1 flex flex-col h-full">
        <span className="label-text">Pasajeros</span>
        <input
          className="input input-bordered"
          type="number"
          {...register("numPassengers")}
          name="numPassengers"
          id="numPassengers"
          min={1}
          defaultValue={1}
          max={10}
        />
      </label>
      <label htmlFor="travelDay" className="col-span-2 flex flex-col">
        <span className="label-text">Día</span>
        <input
          className="input input-bordered w-full"
          type="date"
          min={moment().format("YYYY-MM-DD")}
          {...register("travelDay")}
          name="travelDay"
          id="travelDay"
          defaultValue={moment().format("YYYY-MM-DD")}
          required
        />
      </label>
      <label htmlFor="timeTravel" className="col-span-2 flex flex-col">
        <span className="label-text">Hora</span>
        <input
          type="time"
          {...register("travelTime")}
          name="travelTime"
          id="travelTime"
          className="input input-bordered"
          step={60 * 10}
          defaultValue={getNextIntervalTime()}
          required
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Ida</span>
        <input
          type="radio"
          {...register("direction")}
          name="direction"
          className="radio radio-primary"
          value={TravelDirection.INBOUND}
          defaultChecked={
            getDefaultDirectionValue() === TravelDirection.INBOUND
          }
          required
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Vuelta</span>
        <input
          type="radio"
          {...register("direction")}
          name="direction"
          className="radio radio-primary"
          value={TravelDirection.OUTBOUND}
          defaultChecked={
            getDefaultDirectionValue() === TravelDirection.OUTBOUND
          }
          required
        />
      </label>
      <label className="col-span-2 flex items-center justify-around">
        <span className="label-text">Para mí</span>
        <input
          className="checkbox checkbox-primary"
          defaultChecked
          type="checkbox"
          {...register("forMe")}
          name="forMe"
          id="forMe"
        />
      </label>
      {isForMe !== undefined && !isForMe && (
        <label className="col-span-2 flex flex-col">
          <span className="label-text">Nombre</span>
          <input
            className="input input-bordered"
            type="text"
            {...register("name")}
            name="name"
            id="name"
            required
          />
        </label>
      )}
    </>
  );
}
