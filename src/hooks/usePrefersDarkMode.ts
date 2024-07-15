import { useEffect, useState } from "react";

const usePrefersDarkMode = () => {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [prefersDarkMode, setPrefersDarkMode] = useState(getCurrentTheme());

  const mqListener = (e: MediaQueryListEvent) => setPrefersDarkMode(e.matches);
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener("change", mqListener);
    return () => darkThemeMq.removeEventListener("change", mqListener);
  }, []);
  return prefersDarkMode;
};

export default usePrefersDarkMode;
