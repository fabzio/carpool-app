import { useEffect } from "react";

import { usePrefersDarkMode, useSelector } from "@hooks";
import Header from "./layout/Header";
import SingUp from "./views/sign-up";

export function Main() {
  const { switchTheme, themeChosen, theme } = useSelector(
    (state) => state.theme
  );
  const prefersDarkMode = usePrefersDarkMode();
  useEffect(() => {
    if (prefersDarkMode && theme === "light" && !themeChosen) {
      switchTheme();
    }
  }, [prefersDarkMode, switchTheme]);
  return (
    <div data-theme={theme} className="w-full h-svh  flex flex-col">
      <Header />
      <SingUp />
    </div>
  );
}
