import { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

export default function ThirdScreen({ route }: any) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const { dataLength } = route.params;
  return (
    <LinearGradient
      colors={["black", "transparent"]}
      start={[0, 0]}
      end={[1, 0]}
      locations={[0, 0.005]}
      style={[styles.container, { backgroundColor: colors[themeT].background }]}
    >
      <Text style={[styles.text, { color: colors[themeT].text }]}>
        Total Data Size: {dataLength}
      </Text>
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
