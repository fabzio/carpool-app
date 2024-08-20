import { useSelector } from "@hooks";
import type { Driver } from "@interfaces/models/driver";

interface Props {
  updateMode: boolean;
}

export default function DriverProfile({ updateMode }: Props) {
  const driver = useSelector((state) => state.user).user as Driver;
  return (
    <>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="plate">Placa</label>
        <input
          className="input input-bordered"
          name="plate"
          id="plate"
          type="text"
          defaultValue={driver!.plate ?? ""}
          minLength={7}
          maxLength={7}
          pattern="[A-Z0-9]{3}-[0-9]{3}"
          placeholder="ABC-123"
          disabled={!updateMode}
          required
        />
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="vehicleDescription">Descripción de vehículo</label>
        <input
          className="input input-bordered"
          type="text"
          name="vehicleDescription"
          id="vehicleDescription"
          defaultValue={driver!.vehicleDescription ?? ""}
          disabled={!updateMode}
          placeholder="Ej. Toyota rojo"
          maxLength={100}
          required
        />
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="fee">Tarifa</label>
        <input
          className="input input-bordered"
          type="number"
          name="fee"
          id="fee"
          defaultValue={driver!.fee?.toFixed(2) ?? "5.00"}
          disabled={!updateMode}
          min={0}
          step={0.5}
          max={99.99}
          required
        />
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="seats">Asientos disponibles</label>
        <input
          className="input input-bordered"
          type="number"
          name="seats"
          id="seats"
          defaultValue={driver!.seats ?? "4"}
          disabled={!updateMode}
          min={1}
          max={10}
          required
        />
      </div>
      <div className="col-span-2 flex flex-col">
        <label htmlFor="routeIn">Ruta de ida</label>
        <textarea
          className="textarea textarea-bordered"
          name="routeIn"
          id="routeIn"
          defaultValue={driver!.routeIn ?? ""}
          disabled={!updateMode}
          placeholder="Describe tu ruta de ida"
          maxLength={100}
          required
        />
      </div>
      <div className="col-span-2 flex flex-col">
        <label htmlFor="routeOut">Ruta de vuelta</label>
        <textarea
          className="textarea textarea-bordered"
          name="routeOut"
          id="routeOut"
          defaultValue={driver!.routeOut ?? ""}
          disabled={!updateMode}
          placeholder="Describe tu ruta de vuelta"
          maxLength={100}
          required
        />
      </div>
    </>
  );
}
