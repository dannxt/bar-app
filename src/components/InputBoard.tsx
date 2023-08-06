import { useContext } from "react";
import { View, FlatList, Text } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import colors from "../themes/colors";
import * as Device from "expo-device";

type inputBoardProps = {
  style: { board: object; circle: object };
  inputGrid: Array<string[]>;
  numColumns: number;
};

const InputBoard = ({ style, inputGrid, numColumns }: inputBoardProps) => {
  const { deviceWidth } = useContext(DimensionsContext);
  const { theme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  let circleMargin = 0;
  const circleDimension = deviceWidth / 46;
  interface ColorMapping {
    [key: string]: string;
  }
  // Get the device model and adjust the circle margin accordingly
  switch (Device.modelName) {
    case "iPhone 12":
      circleMargin = 0.0023 * deviceWidth;
      break;

    case "iPhone 14 Plus":
      circleMargin = 0.00245 * deviceWidth;
      break;
  }
  const colorMap: ColorMapping = {
    B: colors[themeT].banker,
    P: colors[themeT].player,
    "": colors[themeT].background,
  };

  type ItemProps = {
    item: string[];
  };

  const renderItem = ({ item }: ItemProps) => {
    return (
      <View>
        {item.map((char, index) => (
          <View
            key={index}
            style={[
              style.circle,
              {
                margin: circleMargin,
                borderRadius: 15,
                width: circleDimension,
                height: circleDimension,
                backgroundColor: colorMap[char],
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "UbuntuMono-Regular",
                textAlign: "center",
                alignItems: "center",
                color: colors[themeT].text,
              }}
            >
              {char}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <FlatList
      style={style.board}
      data={inputGrid}
      renderItem={renderItem}
      keyExtractor={(index) => index.toString()}
      numColumns={numColumns}
    />
  );
};

export default InputBoard;
