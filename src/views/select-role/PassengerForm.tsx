import Paths from "@constants/paths.constants";
import { useSelector } from "@hooks";
import PassengerService from "@services/passenger.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PassengerForm() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { mutate } = useMutation({
    mutationFn: PassengerService.createPassenger,
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
    const passengerData = {
      code: user?.code,
      pickUpPoint: data.get("pickupPoint")?.toString()!,
    };
    mutate(passengerData);
  };

  return (
    <div className="w-full h-3/4 mt-10 px-4 flex flex-col items-center">
      <h2 className="font-bold text-center text-pretty text-xl mb-5;">
        ¿Por dónde te recogerán/dejarán los conductores?
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 w-3/4">
        <label htmlFor="pickupPoint" className="col-span-2 flex flex-col">
          Referencia de paradero
          <textarea
            id="pickupPoint"
            name="pickupPoint"
            className="textarea textarea-bordered"
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
