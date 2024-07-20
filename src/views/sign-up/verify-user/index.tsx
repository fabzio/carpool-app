import { useQuery } from "@tanstack/react-query";
import SelectRole from "./SelectRole";
import UserNotAllowed from "./UserNotAllowed";
import UserService from "@services/user.service";
import { useEffect, useState } from "react";
import { useSelector } from "@hooks";

type SignUpRequest = {
  phone: string;
  code: string;
  zoneId: number;
};
export default function VerifyUser() {
  const [userData, setUserData] = useState<SignUpRequest | null>(null);
  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["pucp-data", userData],
    queryFn: ({ queryKey }) => UserService.signUp(queryKey[1] as SignUpRequest),
    enabled: false,
  });
  const { createUserData } = useSelector((state) => state.signUp);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code: string = (e.target as HTMLFormElement).code.value;
    const phone: string = (e.target as HTMLFormElement).phone.value;
    const phoneRe = /^\d{9}$/;
    const codeRe = /^\d{8}$/;
    if (!codeRe.test(code.trim())) return;
    if (!phoneRe.test(phone.trim())) return;

    const data = {
      phone: phone,
      code,
      zoneId: createUserData!.zoneId,
    };
    setUserData(data);
  };

  useEffect(() => {
    if (userData) refetch();
  }, [userData, refetch]);

  const userId = data?.data?.userId;
  const name = data?.data?.name;
  const success = data?.success;
  const message = data?.message;
  return (
    <div className="w-full h-3/4 mt-10 px-4 flex flex-col items-center">
      {!isFetched && (
        <>
          <h2 className="font-bold text-center text-xl mb-5">
            Vamos a conocernos ;)
          </h2>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <label htmlFor="phone" className="text-lg mb-1">
              Número de comunicación
            </label>
            <input
              id="phone"
              type="tel"
              className="input input-bordered"
              required
              disabled={isLoading || isFetched}
            />
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
              ) : (
                "Regístrate"
              )}
            </button>
          </form>
        </>
      )}
      <section className="h-full grid">
        {isLoading && (
          <p>Ingresando al campus virtual, esto puede tardar un momento....</p>
        )}
        {isFetched && success && <SelectRole userId={userId} name={name} />}
        {isFetched && !success && <UserNotAllowed message={message!} />}
      </section>
    </div>
  );
}
