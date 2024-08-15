import Paths from "@constants/paths.constants";
import { useSelector } from "@hooks";
import AuthService from "@services/auth.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const { user, setCode } = useSelector((state) => state.user);
  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.logIn,
    onSuccess: (_, { code }) => {
      setCode(code);
      navigate(Paths.HOME);
      toast.success("Inicio de sesión exitoso");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const code = form.get("code") as string;
    const password = form.get("password") as string;
    mutate({ code, password });
  };
  return (
    <div className="flex flex-col justify-center">
      <form
        className="flex flex-col w-60 mx-auto gap-3"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-3xl text-balance text-center">
          Inicia sesión en Carpool
        </h2>
        <label htmlFor="code">Código PUCP</label>
        <input
          type="tel"
          name="code"
          required
          className="input 
          input-bordered"
          defaultValue={user?.code ?? ""}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          required
          className="input input-bordered"
        />
        <button type="submit" className="btn btn-primary mx-auto">
          {!isPending ? (
            "Iniciar Sesión"
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
        <span className="divider text-base-content text-opacity-50">
          ¿Nuev@ aquí?
        </span>
        <Link to={Paths.SING_UP} className="mx-auto">
          <button className="btn btn-primary btn-outline ">Registrate</button>
        </Link>
      </form>
    </div>
  );
}
