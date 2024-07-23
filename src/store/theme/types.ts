export interface ThemeStore {
  blur: boolean;
  theme: string;
  themeChosen: boolean;
  switchTheme: () => void;
  switchBlur: () => void;
}
