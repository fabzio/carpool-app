import { useQueries, useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "@components";
import Paths from "@constants/paths.constants";
import QueryKeys from "@constants/queryKeys.constants";
import AuthService from "@services/auth.service";
import UserService from "@services/user.service";
import DriverService from "@services/driver.service";
import PassengerService from "@services/passenger.service";
import { useSelector } from "@hooks";

interface Props {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { user, syncUser, setType } = useSelector((state) => state.user);
  const [{ data: success, isLoading }, { data: userInfo }] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.AUTH],
        queryFn: AuthService.verify,
      },
      {
        queryKey: ["user", user?.code],
        queryFn: () => UserService.getUserType(user?.code!),
      },
    ],
  });

  const {
    data: profileData,
    isLoading: profileLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["profile", user?.code],
    queryFn: () => {
      if (userInfo?.userType === "DRIVER") {
        setType("driver");
        return DriverService.getDriverByCode(user?.code!) as any;
      } else {
        setType("passenger");
        return PassengerService.getPassengerByCode(user?.code!) as any;
      }
    },
    enabled: ["DRIVER", "PASSENGER"].includes(userInfo?.userType ?? ""),
  });

  if (isLoading || profileLoading) return <Loading />;
  if (!success) return <Navigate to={Paths.SING_IN} />;
  if (userInfo?.userType === "INACTIVE") {
    syncUser({
      ...user,
      name: userInfo.name,
      state: "INACTIVE",
    });
    return <Navigate to={Paths.CHOOSE_ROLE} />;
  }
  if (userInfo?.userType === "BOTH") {
    syncUser({
      ...user,
      name: userInfo.name,
      state: "ACTIVE",
    });
    return <Navigate to={Paths.CHOOSE_ROLE} />;
  }
  if (isSuccess) syncUser(profileData);
  return children ? children : <Outlet />;
}
