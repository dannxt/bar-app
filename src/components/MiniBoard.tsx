import { useContext } from "react";
import { Image } from "expo-image";
import { ThemeContext } from "../contexts/ThemeContext";
import colors from "../themes/colors";

export default function MiniBoard({ style }: { style: object }) {
  const { theme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  return (
    <Image
      source={require("../assets/miniboard.png")}
      style={[
        style,
        {
          tintColor: colors[themeT].board,
        },
      ]}
    />
  );
}
