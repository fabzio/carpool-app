import useStore from "@store/index";
import {
  IconMaximize,
  IconMinimize,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";

export default function Header() {
  const { theme, switchTheme } = useStore((state) => state);

  const enterFullScreen = async () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).mozRequestFullScreen) {
      (elem as any).mozRequestFullScreen;
    } else if ((elem as any).webkitRequestFullScreen) {
      (elem as any).webkitRequestFullScreen;
    }
  };

  const toogleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      enterFullScreen();
    }
  };
  return (
    <header className="fixed w-full flex justify-between top-0 z-10 bg-base-100">
      <h1 className="font-bold text-4xl text-left pl-2 pt-2">Carpool 🚗 </h1>
      <div className="flex gap-2 pr-2">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            checked={!(theme === "dracula")}
            onChange={switchTheme}
          />
          <IconSun className="swap-off" size={32} />
          <IconMoon className="swap-on" size={32} />
        </label>
        <label className="swap">
          <input type="checkbox" onClick={toogleFullScreen} />
          <IconMaximize size={32} className="swap-off" />
          <IconMinimize size={32} className="swap-on" />
        </label>
      </div>
    </header>
  );
}
