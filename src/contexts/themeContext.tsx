import { createContext, useState, useContext } from "react";
import colors from "../themes/colors";

export const ThemeContext = createContext({
  theme: "lightTheme",
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("darkTheme");
  const toggleTheme = () => {
    setTheme((prevtheme) =>
      prevtheme === "darkTheme" ? "lightTheme" : "darkTheme"
    );
  };
  const themeT = theme as keyof typeof colors;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
