import { useContext } from "react";
import {
  View,
  StyleSheet,
  PixelRatio,
  Image,
  Platform,
  StyleSheetProperties,
} from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import colors from "../themes/colors";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { Style } from "react-native-paper/lib/typescript/src/components/List/utils";

export default function SmallBoardImage({ style }: { style: object }) {
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const unit = Platform.OS === "ios" ? "pt" : "dp";

  return (
    <Image
      source={require("../assets/smallboard.png")}
      style={[
        style,
        {
          resizeMode: "contain",
          tintColor: colors[themeT].board,
        },
      ]}
    />
  );
}
