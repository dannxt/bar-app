import { useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import colors from "../themes/colors";

type inputBoardProps = {
  style: object;
  inputGrid: Array<string[]>;
};

const InputBoard = ({ style, inputGrid }: inputBoardProps) => {
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
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
    item: string[];
  };

  const renderItem = ({ item }: ItemProps) => {
    return (
      <View>
        {item.map((char, index) => (
          <View
            key={index}
            style={{
              width: deviceWidth / 46,
              height: deviceWidth / 46,
              margin: 2.26,
              borderRadius: 15,
              backgroundColor: colorMap[char],
            }}
          />
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
      numColumns={30}
    />
  );
};

export default InputBoard;
