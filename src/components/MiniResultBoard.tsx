import { useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import colors from "../themes/colors";
import * as Device from "expo-device";

type miniResultBoardProps = {
  style: object;
  inputGrid: Array<object[]>;
  numColumns: number;
};

const MiniResultBoard = ({
  style,
  inputGrid,
  numColumns,
}: miniResultBoardProps) => {
  const { deviceWidth } = useContext(DimensionsContext);
  const { theme }: any = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  let circleMargin = 0;

  interface ColorMapping {
    [key: string]: string;
  }

  const colorMap: ColorMapping = {
    B: colors[themeT].banker,
    P: colors[themeT].player,
    "": colors[themeT].background,
  };

  type ItemProps = {
    item: object[];
  };

  // Get the device model and adjust the circle margin accordingly
  switch (Device.modelName) {
    case "iPhone 12":
      circleMargin = 0.00241 * deviceWidth;
      break;

    case "iPhone 14 Plus":
      circleMargin = 0.00263 * deviceWidth;
      break;
  }

  const renderItem = ({ item }: ItemProps) => {
    return (
      <View>
        {item.map((obj: any, key) => (
          <View
            key={key}
            style={{
              width: deviceWidth / 44.5,
              height: deviceWidth / 44.5,
              margin: circleMargin,
              borderRadius: obj.match === "yes" ? 0 : 15,
              backgroundColor: colorMap[obj.value],
              alignContent: "center",
              // special case for the second match
              borderColor:
                obj.secondMatch === "yes" && obj.value !== ""
                  ? colors[themeT].highlight
                  : "transparent",
              borderWidth: obj.secondMatch === "yes" ? 1.3 : 0,
            }}
          >
            <Text
              style={{
                fontFamily:
                  obj.secondMatch === "yes"
                    ? "UbuntuMono-Italic"
                    : "UbuntuMono-Regular",
                textAlign: "center",
                alignItems: "center",
                color:
                  obj.secondMatch === "yes" ? "white" : colors[themeT].text,
              }}
            >
              {obj.secondMatch === "yes" ? obj.value : ""}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <FlatList
      style={style}
      data={inputGrid}
      renderItem={renderItem}
      keyExtractor={(index) => index.toString()}
      numColumns={numColumns}
    />
  );
};

export default MiniResultBoard;
