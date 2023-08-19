import { useContext, useEffect } from "react";
import { Text, StyleSheet, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../themes/colors";

export default function SettingScreen() {
  const { theme, toggleTheme }: any = useContext(ThemeContext);
  const toggleSwitch = () => {
    toggleTheme();
  };
  const themeT = theme as keyof typeof colors;

  // Function to save user preferences to async storage
  const saveUserPreferences = async () => {
    try {
      await AsyncStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error saving user preferences:", error);
    }
  };
  // Save user preferences whenever darkMode state changes
  useEffect(() => {
    saveUserPreferences();
  }, [theme]);

  return (
    <LinearGradient
      colors={["black", "transparent"]}
      start={[0, 0]}
      end={[1, 0]}
      locations={[0, 0.005]}
      style={[styles.container, { backgroundColor: colors[themeT].background }]}
    >
      <Text style={[styles.text, { color: colors[themeT].text }]}>
        Dark Mode
      </Text>
      <Switch
        trackColor={{
          true: colors[themeT].trackColorFalse,
        }}
        ios_backgroundColor="#b3b1b1"
        onValueChange={toggleSwitch}
        value={theme === "dark" ? true : false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginRight: 20,
  },
});
