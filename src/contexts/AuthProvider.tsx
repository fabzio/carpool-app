import { useEffect } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { type, user, syncUser, setType } = useSelector((state) => state.user);
  const [{ data: success, isLoading }, { data: userInfo }] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.AUTH],
        queryFn: AuthService.verify,
      },
      {
        queryKey: ["user"],
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
      } else if (userInfo?.userType === "PASSENGER") {
        setType("passenger");
        return PassengerService.getPassengerByCode(user?.code!) as any;
      }
    },
    enabled: ["DRIVER", "PASSENGER"].includes(userInfo?.userType ?? ""),
  });

  useEffect(() => {
    if (userInfo?.userType === "INACTIVE") {
      syncUser({
        ...user,
        name: userInfo.name,
        state: "INACTIVE",
      });
      navigate(Paths.CHOOSE_ROLE);
    } else if (userInfo?.userType === "BOTH" && type === "") {
      syncUser({
        ...user,
        name: userInfo.name,
        state: "ACTIVE",
        both: true,
      });
      navigate(Paths.CHOOSE_ROLE);
    } else if (isSuccess && type !== "") {
      if (type === "driver")
        syncUser({ ...profileData, fee: parseFloat((profileData as any).fee) });
      if (type === "passenger") syncUser(profileData);
    } else if (isSuccess && type === "") {
      if (userInfo?.userType === "DRIVER") {
        syncUser({
          ...profileData,
          fee: parseFloat((profileData as any).fee),
        });
      } else if (userInfo?.userType === "PASSENGER") {
        syncUser(profileData);
      }
    }
  }, [userInfo, isSuccess, profileData, syncUser]);

  if (isLoading || profileLoading) return <Loading />;
  if (!success) return <Navigate to={Paths.SING_IN} />;
  return children ? children : <Outlet />;
}
