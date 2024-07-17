import { useEffect } from "react";
import { usePrefersDarkMode,useSelector } from "@hooks";
interface Props {
  children: React.ReactNode;
}
const ThemeProvider = ({children}: Props) =>{
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
      <div data-theme={theme} className="w-full h-svh ">
        {children}
      </div>
    );
}
export default ThemeProvider;