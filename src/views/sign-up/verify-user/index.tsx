import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UserNotAllowed from "./UserNotAllowed";
import UserService from "@services/user.service";
import { useSelector } from "@hooks";
import Paths from "@constants/paths.constants";
import toast from "react-hot-toast";

export default function VerifyUser() {
  const [message, setMessage] = useState<string | null>(null);
  const { syncUser, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: UserService.signUp,
    onSuccess: ({ name }, req) => {
      syncUser({
        ...user,
        name,
        code: req?.code,
        state: "INACTIVE",
      });
      navigate(Paths.CHOOSE_ROLE);
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });
  const { createUserData } = useSelector((state) => state.signUp);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const code = formData.get("code") as string;
    const phone = formData.get("phone") as string;
    const phoneRe = /^\d{9}$/;
    const codeRe = /^\d{8}$/;
    if (!codeRe.test(code.trim())) {
      toast.error("El código PUCP debe tener 8 dígitos");
      return;
    }
    if (!phoneRe.test(phone.trim())) {
      toast.error("El número de teléfono debe tener 9 dígitos");
      return;
    }

    const data = {
      phone: phone,
      code,
      zoneId: createUserData!.zoneId,
    };
    mutate(data);
  };
  return (
    <div className="w-full h-3/4 mt-10 px-4 flex flex-col items-center">
      {!isError && (
        <>
          {" "}
          <h2 className="font-bold text-center text-xl mb-5">
            Vamos a conocernos ;)
          </h2>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <label htmlFor="phone" className="text-lg mb-1">
              Número de comunicación
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="input input-bordered"
              required
              disabled={isPending}
            />
            <label htmlFor="code" className="text-lg mb-1">
              Ingresa tu código PUCP
            </label>
            <input
              id="code"
              name="code"
              type="tel"
              className="input input-bordered"
              required
              disabled={isPending}
            />
            <button
              className={`btn btn-primary mx-10 relative ${
                isPending ? "btn-disabled" : ""
              }`}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Regístrate"
              )}
            </button>
            <span className="divider text-base-content text-opacity-50">o</span>
            <Link to={Paths.SING_IN} className="mx-auto">
              <button className="btn btn-primary btn-outline ">
                Inicia Sesión
              </button>
            </Link>
          </form>
        </>
      )}
      <section className="h-full grid">
        {isPending && (
          <p>Accediendo al campus virtual, esto puede tardar un momento....</p>
        )}
        {isError && <UserNotAllowed message={message!} />}
      </section>
    </div>
  );
}
