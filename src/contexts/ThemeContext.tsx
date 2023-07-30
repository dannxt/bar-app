import { createContext, useState, useContext } from "react";
import colors from "../themes/colors";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prevtheme) => (prevtheme === "dark" ? "light" : "dark"));
  };
  const themeT = theme as keyof typeof colors;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
