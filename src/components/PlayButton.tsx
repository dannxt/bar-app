import * as React from "react";
import { Button } from "react-native-paper";

type PlayButtonProps = {
  onPress: () => void;
  icon?: string;
  title?: string;
  fontSize?: number;
  buttonColor?: string;
  width?: string;
  contentStyle?: object;
};

const PlayButton = ({
  onPress,
  icon,
  title,
  fontSize,
  buttonColor,
  width,
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
    }}
    mode="contained"
    buttonColor={buttonColor}
    style={{
      height: "50%",
      width: width,
      justifyContent: "center",

      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
    }}
    onPress={onPress}
  >
    {title}
  </Button>
);

export default PlayButton;
