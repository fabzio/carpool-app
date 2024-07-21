import useStore from "@store/index";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function Header() {
  const { theme, switchTheme } = useStore((state) => state);

  return (
    <header className="fixed w-full flex justify-between top-0 z-10 bg-base-100">
      <h1 className="font-bold text-4xl text-left pl-2 pt-2">Carpool 🚗 </h1>
      <label className="swap swap-rotate pr-4 pt-2">
        <input
          type="checkbox"
          className="theme-controller"
          checked={!(theme === "dracula")}
          onChange={switchTheme}
        />
        <IconSun className="swap-off" size={32} />
        <IconMoon className="swap-on" size={32} />
      </label>
    </header>
  );
}
