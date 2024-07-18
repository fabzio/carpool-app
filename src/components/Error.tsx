import { IconHeartBroken } from "@tabler/icons-react";

export default function Error() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <IconHeartBroken size={64} />
      <h2 className="font-bold text-3xl text-balance">
        No eres tú, es el server
      </h2>
      <p className="mt-2  text-center text-balance">
        Algo salió mal, mira unos gatitos tiernos mientras lo arreglamos
      </p>
      <button className="btn btn-primary mt-4">
        {" "}
        <a href="https://www.youtube.com/watch?v=y0sF5xhGreA">
          Ver gatitos
        </a>{" "}
      </button>
    </div>
  );
}
