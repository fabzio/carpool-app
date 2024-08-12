import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "@components";
import Paths from "@constants/paths.constants";
import QueryKeys from "@constants/queryKeys.constants";
import AuthService from "@services/auth.service";
interface Props {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { data: succes, isLoading } = useQuery({
    queryKey: [QueryKeys.AUTH],
    queryFn: AuthService.verify,
  });
  if (isLoading) return <Loading />;
  if (!succes) return <Navigate to={Paths.SING_IN} />;
  return children ? children : <Outlet />;
}
