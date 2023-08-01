import { createContext, useState, useContext, useEffect } from "react";
import colors from "../themes/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({
  theme: null as string | null, // Initialize with null
  toggleTheme: () => {},
  themeHandler: (theme: string | null) => {}, // Updated to expect string or null
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string | null>(null); // Initialize with null
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  function themeHandler(theme: string | null) {
    // Updated to expect string or null
    setTheme(theme);
  }
  const themeT = theme as keyof typeof colors;

  // Function to load user preferences from local storage
  const loadUserPreferences = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("theme");
      console.log("Stored theme:", storedTheme);
      console.log("Current theme:", theme);
      if (storedTheme !== theme && storedTheme !== null) {
        themeHandler(storedTheme);
      }
      if (storedTheme === null) {
        themeHandler("dark");
      }
    } catch (error) {
      console.error("Error loading user preferences:", error);
    }
  };

  useEffect(() => {
    loadUserPreferences();
  }, []);

  if (theme === null) {
    // Show a loading screen or null while the theme is being loaded
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, themeHandler, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
