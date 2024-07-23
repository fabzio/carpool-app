import { Loading } from "@components";
import AuthService from "@services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
interface Props {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: AuthService.verify,
  });
  if (isLoading) return <Loading />;
  if (!data?.success) return <Navigate to="/signup" />;
  return children ? children : <Outlet />;
}
