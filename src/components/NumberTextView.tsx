import React, { useContext, useMemo } from "react";
import { View, Text, StyleSheet, PixelRatio } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";

import { ThemeContext } from "../contexts/ThemeContext";
import colors from "../themes/colors";

const NumberTextView = ({ inputLength }: any) => {
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const fontScale = PixelRatio.getFontScale();
  const numbersArray = useMemo(
    () => Array.from(Array(28).keys()).map((_) => _ + 1),
    []
  );
  const { theme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;

  return (
    <View
      style={{
        flexDirection: "row",
        width: "90%",
        top: deviceHeight * 0.025,
        justifyContent: "space-evenly",
        position: "absolute",
        paddingLeft: deviceWidth * 0.022,
        paddingRight: deviceWidth * 0.025,
        zIndex: 5,
      }}
    >
      {numbersArray.map((number) => (
        <Text
          key={number}
          style={{
            color:
              number === inputLength
                ? colors[themeT].highlighText
                : colors[themeT].text,
            textDecorationLine: number === inputLength ? "underline" : "none",
            fontFamily: "UbuntuMono-Bold",
            textAlign: "center",
            fontSize: fontScale * 10,
            paddingVertical: number === inputLength ? 1.5 : 5,
            width: deviceWidth * 0.02225,
          }}
        >
          {number}
        </Text>
      ))}
    </View>
  );
};

export default NumberTextView;
