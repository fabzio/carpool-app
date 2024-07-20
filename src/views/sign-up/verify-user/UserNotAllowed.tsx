import { IconMoodSadDizzy, IconMoodWink } from "@tabler/icons-react";

export default function NotRegisted({ message }: { message: string }) {
  const existingUser = message === "El usuario ya existe";
  const errorTitle = existingUser ? "Déjà vu" : "No te pudimos identificar";
  const errorSubtitle = existingUser
    ? "¡Parece que ya te conocemos! Inicia sesión para continuar 🙌"
    : "Lo sentimos, esta aplicación esta destinada a usuarios que pertenecen a la universidad. Si crees que esto es un error, trata de nuevo, el sistema hace lo que puede 😞";
  const errroIcon = existingUser ? (
    <IconMoodWink size={96} stroke={1} />
  ) : (
    <IconMoodSadDizzy size={96} stroke={1} />
  );

  return (
    <article className="flex flex-col justify-center items-center">
      <h3 className="font-bold text-center text-3xl">{errorTitle}</h3>
      {errroIcon}
      <p className="text-center text-balance">{errorSubtitle}</p>
      {existingUser && (
        <button className="btn btn-primary mt-5">Ir a inicio de sesión</button>
      )}
    </article>
  );
}
