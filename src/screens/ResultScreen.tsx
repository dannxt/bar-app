import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/themeContext";

export default function ResultScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  return (
    <View
      style={[styles.container, { backgroundColor: colors[themeT].background }]}
    >
      <Text style={[styles.text, { color: colors[themeT].text }]}>
        Result Screen
      </Text>
    </View>
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
