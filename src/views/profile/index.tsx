import QueryKeys from "@constants/queryKeys.constants";
import { useSelector } from "@hooks";
import ZoneService from "@services/zone.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { capitalize } from "@utils/capitalize";
import { useRef, useState } from "react";
import DriverProfile from "./DriverProfile";
import PassengerProfile from "./PassengerProfile";
import type { Driver } from "@interfaces/models/driver";
import toast from "react-hot-toast";
import { equalObjects } from "./utils";
import DriverService from "@services/driver.service";
import PassengerService from "@services/passenger.service";
import SectionPoppover from "./SectionPoppover";
import ChangePassword from "./ChangePassword";
import NewRole from "./NewRole";

export default function Profile() {
  const { type, user, syncUser } = useSelector((state) => state.user);
  const [updateMode, setUpdateMode] = useState(false);
  const [page, setPage] = useState<"profile" | "password" | "role">("profile");
  const formRef = useRef<HTMLFormElement>(null);
  const { data: zones } = useQuery({
    queryKey: [QueryKeys.ZONES],
    queryFn: ZoneService.getZones,
  });
  const { mutate } = useMutation({
    mutationFn: (data: Partial<Driver>) => {
      return type === "driver"
        ? DriverService.updateDriver(data)
        : PassengerService.updatePassenger(data);
    },
    onMutate: (newData) => {
      const previousData = user as Driver;
      setUpdateMode(false);
      syncUser({ ...user, ...newData });
      return { previousData };
    },
    onError: ({ message }, __, context) => {
      if (context?.previousData) {
        syncUser(context.previousData);
      }
      formRef.current?.reset();
      toast.error(message);
    },
    onSuccess: () => {
      toast.success("Perfil actualizado");
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateMode(true);
  };
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    form.forEach((value, key) => {
      data[key] = value.toString();
    });
    const newData = {
      ...data,
      pickUpPoint: data.pickUpPoint,
      plate: data.plate?.toUpperCase(),
      fee: parseFloat(data.fee),
      seats: parseInt(data.seats),
      zoneId: parseInt(data.zoneId),
    } as Partial<Driver>;
    if (!equalObjects(newData, user!)) {
      mutate(newData);
    } else setUpdateMode(false);
  };
  return (
    <article className="px-4 flex flex-col gap-4 mt-2">
      <section>
        <SectionPoppover setPage={setPage} />
        <header className="text-center">
          <p className="font-bold text-xl"> {capitalize(user!.name)}</p>
          <p className="font-bold text-xl">{capitalize(user!.lastname)}</p>
          <p className="text-base-content text-opacity-70">
            {type === "driver" ? "Conductor(a)" : "Pasajero/a"}
          </p>
          <p className="text-base-content text-opacity-70">{user!.email}</p>
          <p className="text-base-content text-opacity-70">{user!.code}</p>
        </header>
      </section>
      <main>
        {page === "role" && <NewRole />}
        {page === "password" && <ChangePassword />}
        {page === "profile" && (
          <form
            ref={formRef}
            className="grid grid-cols-2 gap-y-3 gap-x-1"
            onSubmit={updateMode ? handleSave : handleUpdate}
          >
            <div className="col-span-1 flex flex-col">
              <label htmlFor="phone">Celular</label>
              <input
                className="input"
                type="tel"
                name="phone"
                id="phone"
                minLength={9}
                maxLength={9}
                defaultValue={user!.phone}
                disabled={!updateMode}
                required
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <label htmlFor="zone">Zona</label>
              <select
                className="select"
                name="zoneId"
                id="zoneId"
                defaultValue={
                  zones?.find((zone) => zone.id === user!.zoneId)?.id
                }
                disabled={!updateMode}
                required
              >
                {zones?.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>
            {type === "driver" ? (
              <DriverProfile updateMode={updateMode} />
            ) : (
              <PassengerProfile updateMode={updateMode} />
            )}
            <div className="col-span-2 flex justify-center gap-2">
              <button className="btn btn-primary">
                {updateMode ? "Guardar" : "Editar"}
              </button>
            </div>
          </form>
        )}
      </main>
    </article>
  );
}
