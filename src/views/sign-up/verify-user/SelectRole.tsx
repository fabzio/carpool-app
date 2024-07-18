import { useSelector } from "@hooks";
import { UserData } from "@store/signup/types";
import { IconSteeringWheel, IconUser } from "@tabler/icons-react";

interface Props {
  data: UserData;
}

export default function SelectRole({ data }: Props) {
  const { setUserData } = useSelector((state) => state.signUp);
  const handleContinue = (role: "driver" | "passenger") => () => {
    setUserData({ ...(data as Omit<UserData, "role">), role } as UserData);
  };
  return (
    <div className=" flex flex-col items-center justify-center">
      <h3 className="text-center text-balance">
        Hola! {(data as { name: string }).name} ¿Cómo usarás la app?
      </h3>
      <div className="w-full flex gap-5 h-32 mt-3">
        <button className="flex-grow " onClick={handleContinue("driver")}>
          <div className="card h-full w-full flex flex-col items-center gap-2  shadow-xl">
            <IconSteeringWheel stroke={2} size={64} opacity={0.7} />
            Conductor
          </div>
        </button>
        <button className="flex-grow" onClick={handleContinue("passenger")}>
          <div className="card h-full w-full flex flex-col items-center gap-2 shadow-xl">
            <IconUser stroke={2} size={64} opacity={0.7} />
            <span>Pasajero</span>
          </div>
        </button>
      </div>
      <p className="mt-2 text-center text-pretty text-base-content text-opacity-50">
        Podrás usarla de ambas maneras más adelante
      </p>
    </div>
  );
}
