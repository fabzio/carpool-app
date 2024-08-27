import Paths from "@constants/paths.constants";
import { useSelector } from "@hooks";
import DriverService from "@services/driver.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DriverForm() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: DriverService.createDriver,
    onSuccess: () => {
      toast.success(
        "Su cuenta fue activada, revisa tu correo PUCP para continuar :D",
        {
          duration: 10000,
        }
      );
      navigate(Paths.LOGIN);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const driverData = {
      code: user?.code,
      plate: data.get("plate")?.toString()!.toUpperCase(),
      vehicleDescription: data.get("vehicleDescription")?.toString()!,
      seats: parseInt(data.get("seats")?.toString()!),
      fee: Number(data.get("fee")),
      routeIn: data.get("routeIn")?.toString()!,
      routeOut: data.get("routeOut")?.toString()!,
    };
    mutate(driverData);
  };
  return (
    <div className="w-full h-3/4 mt-10 px-4 flex flex-col items-center">
      <h2 className="font-bold text-center text-xl mb-5;">
        ¿Cómo te indentificarán tus pasajeros?
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
        <label htmlFor="plate" className="col-span-2 flex flex-col">
          Placa
          <input
            id="plate"
            name="plate"
            type="text"
            className="input input-bordered"
            pattern="[A-Z0-9]{3}-[0-9]{3}"
            placeholder="ABC-123"
            required
          />
        </label>
        <label htmlFor="brand" className="col-span-2 flex flex-col">
          Descripción del vehículo
          <textarea
            id="vehicleDescription"
            name="vehicleDescription"
            className="textarea textarea-bordered"
            placeholder="Apariencia del vehículo Ejm: Toyota rojo"
            maxLength={50}
            required
          />
        </label>
        <label htmlFor="seats" className="col-span-1 flex flex-col">
          Máximo de pasajeros
          <input
            id="seats"
            name="seats"
            type="number"
            min={0}
            max={10}
            className="input input-bordered"
            defaultValue={4}
            required
          />
        </label>
        <label htmlFor="fee" className="col-span-1 flex flex-col">
          Tarifa
          <input
            id="fee"
            name="fee"
            type="number"
            min={0}
            max={99}
            step={0.5}
            className="input input-bordered"
            defaultValue={"5.00"}
            required
          />
        </label>
        <label htmlFor="routeIn" className="col-span-2 flex flex-col">
          Ruta de ida
          <textarea
            id="routeIn"
            name="routeIn"
            className="textarea textarea-bordered"
            placeholder="Describe la ruta de ida que sigues"
            maxLength={100}
            required
          />
        </label>
        <label htmlFor="routeOut" className="col-span-2 flex flex-col">
          Ruta de vuelta
          <textarea
            id="routeOut"
            name="routeOut"
            className="textarea textarea-bordered"
            placeholder="Describe la ruta de vuelta que sigues"
            maxLength={100}
            required
          />
        </label>
        <div className="col-span-2 flex justify-center">
          <button className="btn btn-primary mx-10">Todo listo!</button>
        </div>
      </form>
    </div>
  );
}
