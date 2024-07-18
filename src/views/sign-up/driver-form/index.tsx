export default function DriverForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      plate: data.get("plate"),
      vehicleDescription: data.get("vehicleDescription"),
      seats: data.get("seats"),
      fee: data.get("fee"),
      route: data.get("route"),
    });
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
            step={0.5}
            className="input input-bordered"
            defaultValue={"5.00"}
            required
          />
        </label>
        <label htmlFor="route" className="col-span-2 flex flex-col">
          Ruta
          <textarea
            id="route"
            name="route"
            className="textarea textarea-bordered"
            placeholder="Describe la ruta que sigues (ida y vuelta)"
            maxLength={150}
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
