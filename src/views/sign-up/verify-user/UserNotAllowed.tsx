import { IconMoodSadDizzy } from "@tabler/icons-react";

export default function UserNotAllowed() {
  return (
    <article className="flex flex-col justify-center items-center">
      <h3 className="font-bold text-center text-3xl">No se pudo verificar</h3>
      <IconMoodSadDizzy size={96} stroke={1} />
      <p className="text-center text-balance">
        Por razones de seguridad solo se admiten usuarios que pertenezcan a la
        universidad
      </p>
    </article>
  );
}
