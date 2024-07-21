import { Loading } from "@components";
import AuthService from "@services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "react-use-cookie";
interface Props {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const token = getCookie("tkn");

  const { data, isLoading } = useQuery({
    queryKey: ["auth", token],
    queryFn: ({ queryKey }) => AuthService.verify(queryKey[1]),
  });
  console.log(data);
  if (isLoading) return <Loading />;
  if (!data?.success) return <Navigate to="/signup" />;
  return children ? children : <Outlet />;
}
