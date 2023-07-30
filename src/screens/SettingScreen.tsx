import { useState, useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../themes/colors";

export default function SettingScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled((previousState: boolean) => !previousState);
    toggleTheme();
  };
  const themeT = theme as keyof typeof colors;

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
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
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
