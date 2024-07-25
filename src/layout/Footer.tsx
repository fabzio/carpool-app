import Paths from "@constants/paths.constants";
import { IconHistory, IconHome, IconUserCircle } from "@tabler/icons-react";

import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="btm-nav">
      <NavLink
        to={Paths.HISTORY}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <IconHistory />
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
