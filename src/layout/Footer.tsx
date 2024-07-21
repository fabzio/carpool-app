import { IconHistory, IconHome, IconUserCircle } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="btm-nav">
      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <IconHistory />
      </NavLink>
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <IconHome />
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <IconUserCircle />
      </NavLink>
    </footer>
  );
}
