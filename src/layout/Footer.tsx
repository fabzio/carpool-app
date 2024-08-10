import Paths from "@constants/paths.constants";
import { useSelector } from "@hooks";
import { IconHistory, IconHome, IconUserCircle } from "@tabler/icons-react";

import { NavLink } from "react-router-dom";

export default function Footer() {
  const { newTravel, resetNotification } = useSelector(
    (state) => state.notification
  );
  return (
    <footer className="btm-nav">
      <NavLink
        to={Paths.HISTORY}
        className={({ isActive }) => {
          if (isActive) {
            if (newTravel) resetNotification("newTravel");
            return "active";
          } else return "";
        }}
      >
        <div className="indicator">
          {newTravel && (
            <span className="indicator-item badge badge-xs badge-primary" />
          )}
          <IconHistory />
        </div>
      </NavLink>
      <NavLink
        to={Paths.HOME}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <IconHome />
      </NavLink>
      <NavLink
        to={Paths.PROFILE}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <IconUserCircle />
      </NavLink>
    </footer>
  );
}
