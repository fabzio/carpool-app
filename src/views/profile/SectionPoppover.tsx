import Paths from "@constants/paths.constants";
import { useSelector } from "@hooks";
import DriverService from "@services/driver.service";
import PassengerService from "@services/passenger.service";
import { IconMenu2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "react-use-cookie";

interface Props {
  setPage: React.Dispatch<
    React.SetStateAction<"profile" | "password" | "role">
  >;
}

export default function SectionPoppover({ setPage }: Props) {
  const navigate = useNavigate();
  const { type, setType, user, syncUser } = useSelector((state) => state.user);
  const { mutate } = useMutation({
    mutationFn: () => {
      return type === "driver"
        ? (PassengerService.getPassengerByCode(user?.code!) as any)
        : (DriverService.getDriverByCode(user?.code!) as any);
    },
    onSuccess: (data) => {
      if (typeof data === "object") {
        syncUser({ ...data, both: true });
      }
    },
    onSettled: () => {
      setType(type === "driver" ? "passenger" : "driver");
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const closeSession = () => {
    removeCookie("tkn");
    navigate(Paths.LOGIN);
    setType("");
    syncUser(null);
  };

  const handleClick = (page: "profile" | "password" | null = null) => {
    if (page) {
      setPage(page);
    }
    setIsOpen(false);
  };
  const switchRole = () => {
    if (user?.both) {
      mutate();
    } else {
      setPage("role");
    }
    setIsOpen(false);
  };

  return (
    <div>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle btn-xs"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconMenu2 />
        </div>
        {isOpen && (
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => handleClick("profile")}>Editar perfil</a>
            </li>
            <li>
              <a onClick={() => handleClick("password")}>Cambiar contraseña</a>
            </li>
            <li>
              <a onClick={switchRole}>Cambiar rol</a>
            </li>
            <li>
              <a onClick={closeSession}>Cerrar sesión</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
