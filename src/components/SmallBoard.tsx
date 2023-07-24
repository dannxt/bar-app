import { useState, useContext } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import colors from "../themes/colors";

export default function SmallBoard({ style }: { style: object }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  return (
    <Image
      source={require("../assets/smallboard.png")}
      style={[
        style,
        {
          tintColor: colors[themeT].board,
        },
      ]}
    />
  );
}
