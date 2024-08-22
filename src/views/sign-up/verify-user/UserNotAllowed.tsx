import {
  IconMistOff,
  IconMoodSadDizzy,
  IconMoodWink,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Paths from "@constants/paths.constants";

export default function NotRegisted({ message }: { message: string }) {
  const existingUser = message === "El usuario ya existe";
  const emailError =
    message === "Tu correo no coincide con el registrado en la universidad";
  const errorTitle = existingUser
    ? "Déjà vu"
    : emailError
    ? "Como que algo no cuadra, ¿no?"
    : "No te pudimos identificar";
  const errorSubtitle = existingUser
    ? "¡Parece que ya te conocemos! Inicia sesión para continuar 🙌"
    : emailError
    ? "Tu correo no coincide con el registrado en la universidad, revisa tus datos e intenta de nuevo 🙏"
    : "Lo sentimos, esta aplicación esta destinada a usuarios que pertenecen a la universidad. Si crees que esto es un error, trata de nuevo, el sistema hace lo que puede 😞";
  const errroIcon = existingUser ? (
    <IconMoodWink size={96} stroke={1} />
  ) : emailError ? (
    <IconMistOff size={96} stroke={1} />
  ) : (
    <IconMoodSadDizzy size={96} stroke={1} />
  );

  return (
    <article className="flex flex-col justify-center items-center">
      <h3 className="font-bold text-center text-pretty text-3xl">{errorTitle}</h3>
      {errroIcon}
      <p className="text-center text-balance">{errorSubtitle}</p>
      {existingUser && (
        <Link to={Paths.SING_IN}>
          <button className="btn btn-primary mt-5">
            Ir a inicio de sesión
          </button>
        </Link>
      )}
    </article>
  );
}
