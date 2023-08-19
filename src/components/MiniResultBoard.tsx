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
  inputLength?: number;
};

const MiniResultBoard = ({
  style,
  inputGrid,
  numColumns,
  inputLength,
}: miniResultBoardProps) => {
  const { deviceWidth } = useContext(DimensionsContext);
  const { theme }: any = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;

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
  let circleMargin = 0;
  switch (Device.modelName) {
    case "iPhone 12":
      circleMargin = 0.00254 * deviceWidth;
      break;

    case "iPhone 14 Plus":
      circleMargin = 0.00263 * deviceWidth;
      break;
  }
  const renderItem = ({ item }: ItemProps) => {
    return (
      <View>
        {item.map((obj: any, key) => {
          let textContent = "";
          if (obj.secondMatch === "yes") {
            textContent = obj.value;
          } else if (obj.key === inputLength) {
            textContent = inputLength.toString();
          } else {
            textContent = "";
          }
          return (
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
                {textContent}
              </Text>
            </View>
          );
        })}
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
