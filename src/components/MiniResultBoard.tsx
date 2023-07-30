import { useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import colors from "../themes/colors";

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
    item: object[];
  };

  const renderItem = ({ item }: ItemProps) => {
    return (
      <View>
        {item.map((obj: any, key) => (
          <View
            key={key}
            style={{
              width: deviceWidth / 44.1,
              height: deviceWidth / 44.1,
              margin: 2.28,
              borderRadius: obj.match === "yes" ? 0 : 15,
              backgroundColor: colorMap[obj.value],
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "UbuntuMono-Regular",
                textAlign: "center",
                alignItems: "center",
                color: colors[themeT].text,
              }}
            >
              {obj.value}
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
