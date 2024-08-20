import Paths from "@constants/paths.constants";
import { useSelector } from "@hooks";

import { IconSteeringWheel, IconUser } from "@tabler/icons-react";
import { capitalize } from "@utils/capitalize";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverForm from "./DriverForm";
import PassengerForm from "./PassengerForm";
import DriverService from "@services/driver.service";
import PassengerService from "@services/passenger.service";
import toast from "react-hot-toast";

export default function SelectRole() {
  const navigate = useNavigate();
  const { setUserData } = useSelector((state) => state.signUp);
  const { user, setType, syncUser } = useSelector((state) => state.user);
  const [showForm, setForm] = useState<"driver" | "passenger" | null>(null);

  const handleContinue = (role: "driver" | "passenger") => () => {
    if (user?.state === "INACTIVE") {
      setUserData({ role });
      setForm(role);
    } else {
      setType(role);
      if (role === "driver") {
        DriverService.getDriverByCode(user?.code!)
          .then((driver) => {
            syncUser({ ...driver, both: true });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
      if (role === "passenger") {
        PassengerService.getPassengerByCode(user?.code!)
          .then((passenger) => {
            syncUser({ ...passenger, both: true });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
      navigate(Paths.HOME);
    }
  };
  return (
    <>
      {!showForm && (
        <div className=" flex flex-col items-center justify-center">
          <h3 className="font-bold text-pretty text-center text-2xl px-2">
            {user?.state === "INACTIVE"
              ? "¡Bienvenid@ a Carpool"
              : "¡Hola de nuevo"}
            , {capitalize(user?.name)}! 🎉
          </h3>
          <h3 className="text-center text-balance">¿Cómo usarás la app?</h3>
          <div className="w-full flex gap-5 h-32 mt-3">
            <button className="flex-grow " onClick={handleContinue("driver")}>
              <div className="card h-full w-full flex flex-col items-center gap-2  shadow-xl">
                <IconSteeringWheel stroke={2} size={64} opacity={0.7} />
                Conductor(a)
              </div>
            </button>
            <button className="flex-grow" onClick={handleContinue("passenger")}>
              <div className="card h-full w-full flex flex-col items-center gap-2 shadow-xl">
                <IconUser stroke={2} size={64} opacity={0.7} />
                <span>Pasajero/a</span>
              </div>
            </button>
          </div>
          <p className="mt-2 text-center text-pretty text-base-content text-opacity-50">
            Podrás usarla de ambas maneras más adelante
          </p>
        </div>
      )}
      {showForm === "driver" && <DriverForm />}
      {showForm === "passenger" && <PassengerForm />}
    </>
  );
}
