import { useQuery } from "@tanstack/react-query";

const checkCode = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "FABRIZIO RANDALL",
        lastname: "MONTOYA PINTO",
        faculty: "CIEN. ING",
        email: "FMONTOYA@PUCP.EDU.PE",
      });
    }, 1000);
  });
};

export default function VerifyUser() {
  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["pucp-data"],
    queryFn: checkCode,
    enabled: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="w-full h-3/4 mt-10 px-4 flex flex-col items-center">
      <h3 className="font-bold text-center text-xl mb-5">
        Vamos a conocernos ;)
      </h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="code" className="text-lg mb-1">
          Ingresa tu código PUCP
        </label>
        <input id="code" type="tel" className="input input-bordered" />
        <button
          className={`btn btn-primary mx-10 relative ${
            isLoading || isFetched ? "btn-disabled" : ""
          }`}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : isFetched ? (
            "Usuario verificado"
          ) : (
            "Verificar"
          )}
        </button>
      </form>

      <section>
        {isFetched && (
          <div className="mt-10 flex flex-col items-center justify-center">
            <h3>Hola! {(data as { name: string }).name} </h3>
            <button className="btn btn-primary mt-3">Continuar</button>
          </div>
        )}
      </section>
    </div>
  );
}
