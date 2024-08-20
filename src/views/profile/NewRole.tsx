import { useSelector } from "@hooks";
import DriverProfile from "./DriverProfile";
import PassengerProfile from "./PassengerProfile";
import { useMutation } from "@tanstack/react-query";
import DriverService from "@services/driver.service";
import PassengerService from "@services/passenger.service";
import type { Passenger } from "@interfaces/models/passenger";
import type { Driver } from "@interfaces/models/driver";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewRole() {
  const { syncUser, type, user, setType } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (data: Partial<Driver> | Partial<Passenger>) => {
      return type === "passenger"
        ? (DriverService.createDriver({ code: user?.code, ...data }) as any)
        : (PassengerService.createPassenger({
            code: user?.code,
            ...data,
          } as Pick<Passenger, "code" | "pickUpPoint">) as any);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
    onSuccess: () => {
      if (type === "driver") {
        PassengerService.getPassengerByCode(user?.code!)
          .then((passenger) => {
            syncUser({ ...passenger, both: true });
            setType("passenger");
          })
          .catch(() => {
            toast.error("Error al obtener el perfil de pasajero");
          });
      }
      if (type === "passenger") {
        DriverService.getDriverByCode(user?.code!)
          .then((driver) => {
            syncUser({ ...driver, both: true });
            setType("driver");
          })
          .catch(() => {
            toast.error("Error al obtener el perfil de conductor");
          });
      }
      navigate(0);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    form.forEach((value, key) => {
      data[key] = value.toString();
    });
    mutate(data);
  };
  return (
    <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
      {type === "driver" && <PassengerProfile updateMode={true} />}
      {type === "passenger" && <DriverProfile updateMode={true} />}
      <div className="col-span-2 flex justify-center">
        <button className="btn btn-primary" type="submit">
          Registrarse como {type === "driver" ? "pasajero" : "conductor "}
        </button>
      </div>
    </form>
  );
}
