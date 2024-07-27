import { Loading } from "@components";
import QueryKeys from "@constants/queryKeys.constants";
import AuthService from "@services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
interface Props {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { data: succes, isLoading } = useQuery({
    queryKey: [QueryKeys.AUTH],
    queryFn: AuthService.verify,
  });
  if (isLoading) return <Loading />;
  if (!succes) return <Navigate to="/signup" />;
  return children ? children : <Outlet />;
}
