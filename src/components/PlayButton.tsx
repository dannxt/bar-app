import * as React from "react";
import { Button } from "react-native-paper";

type PlayButtonProps = {
  onPressIn: () => void;
  icon?: string;
  title?: string;
  fontSize?: number;
  buttonColor?: string;
  width?: string;
  height?: string;
  contentStyle?: object;
};
const PlayButton = ({
  onPressIn,
  icon,
  title,
  fontSize,
  buttonColor,
  width,
  height,
  contentStyle,
}: PlayButtonProps) => (
  <Button
    icon={icon}
    contentStyle={[contentStyle, { height: "100%" }]}
    labelStyle={{
      fontSize: fontSize,
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
      shadowColor: "black",
      fontWeight: "bold",
    }}
    mode="elevated"
    buttonColor={buttonColor}
    textColor="white"
    style={{
      height: height,
      width: width,
      justifyContent: "center",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      marginHorizontal: 5,
      marginBottom: 15,
      padding: 0,
      elevation: 125,
    }}
    onPressIn={onPressIn}
  >
    {title}
  </Button>
);

export default PlayButton;
