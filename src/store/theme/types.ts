export interface ThemeStore {
  theme: string;
  switchTheme: () => void;
  themeChosen: boolean;
}
