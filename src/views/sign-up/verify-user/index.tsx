import { UserData } from "@store/signup/types";
import { useQuery } from "@tanstack/react-query";
import SelectRole from "./SelectRole";
import UserNotAllowed from "./UserNotAllowed";

const checkCode = async () => {
  return new Promise<Partial<UserData>>((res) => {
    setTimeout(() => {
      res({
        name: "FABRIZIO RANDALL",
        lastname: "MONTOYA PINTO",
        faculty: "CIEN. ING",
        email: "FMONTOYA@PUCP.EDU.PE",
        code: "20140397",
      });
    }, 1000);
  });
};

export default function VerifyUser() {
  const { data, isSuccess, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["pucp-data"],
    queryFn: checkCode,
    enabled: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = (e.target as HTMLFormElement).code.value;
    const codeRe = /^\d{8}$/;
    if (!codeRe.test(code.trim())) return;
    refetch();
  };

  return (
    <div className="w-full h-3/4 mt-10 px-4 flex flex-col items-center">
      <h2 className="font-bold text-center text-xl mb-5">
        Vamos a conocernos ;)
      </h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="code" className="text-lg mb-1">
          Ingresa tu código PUCP
        </label>
        <input
          id="code"
          type="tel"
          className="input input-bordered"
          required
          disabled={isLoading || isFetched}
        />
        <button
          className={`btn btn-primary mx-10 relative ${
            isLoading || isFetched ? "btn-disabled" : ""
          }`}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : isFetched ? (
            data!.code ? (
              "Usuario verificado"
            ) : (
              "Usuario inválido"
            )
          ) : (
            "Verificar"
          )}
        </button>
      </form>

      <section className="h-full grid">
        {isSuccess &&
          (data.code ? (
            <SelectRole data={data as UserData} />
          ) : (
            <UserNotAllowed />
          ))}
      </section>
    </div>
  );
}
