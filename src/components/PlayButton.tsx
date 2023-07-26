import * as React from "react";
import { Button } from "react-native-paper";

type PlayButtonProps = {
  onPress: () => void;
  icon?: string;
  title?: string;
  fontSize?: number;
  buttonColor?: string;
  width?: string;
  height?: string;
  contentStyle?: object;
};

const PlayButton = ({
  onPress,
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
      flexWrap: "nowrap",
    }}
    mode="contained"
    buttonColor={buttonColor}
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
    }}
    onPress={onPress}
  >
    {title}
  </Button>
);

export default PlayButton;
