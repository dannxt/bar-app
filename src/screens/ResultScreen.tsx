import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Keyboard } from "react-native";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { LinearGradient } from "expo-linear-gradient";
import MiniBoard from "../components/MiniBoard";
import MiniResultBoard from "../components/MiniResultBoard";
import { SearchResultGridContext } from "../contexts/SearchResultGridContext";

export default function ResultScreen() {
  //Contexts
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { theme }: any = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const textColor = { color: colors[themeT].text };
  const { searchResultsGrid9, searchResultsGrid3, searchResultsGrid4 } =
    useContext(SearchResultGridContext);

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <LinearGradient
        colors={["black", "transparent"]}
        start={[0, 0]}
        end={[1, 0]}
        locations={[0, 0.005]}
        style={{
          flex: 1,
          backgroundColor: colors[themeT].background,
        }}
      >
        <View style={styles.boardCont}>
          <View style={styles.boardInnerCont}>
            <Text
              style={[
                textColor,
                styles.roadTitle,
                {
                  fontSize: 0.02 * deviceWidth,
                },
              ]}
            >
              Type A
            </Text>
            <MiniBoard style={styles.miniBoard} />
            <MiniResultBoard
              style={styles.miniResultBoard}
              inputGrid={searchResultsGrid9}
              numColumns={8}
            />
          </View>
          <View style={styles.boardInnerCont}>
            <Text
              style={[
                textColor,
                styles.roadTitle,
                {
                  fontSize: 0.02 * deviceWidth,
                },
              ]}
            >
              Type B
            </Text>
            <MiniBoard style={styles.miniBoard} />
            <MiniResultBoard
              style={styles.miniResultBoard}
              inputGrid={searchResultsGrid3}
              numColumns={8}
            />
          </View>
          <View style={styles.boardInnerCont}>
            <Text
              style={[
                textColor,
                styles.roadTitle,
                {
                  fontSize: 0.02 * deviceWidth,
                },
              ]}
            >
              Type C
            </Text>
            <MiniBoard style={styles.miniBoard} />
            <MiniResultBoard
              style={styles.miniResultBoard}
              inputGrid={searchResultsGrid4}
              numColumns={8}
            />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boardCont: {
    flex: 1,
    flexDirection: "row",
  },
  boardInnerCont: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  miniResultBoard: {
    position: "absolute",
    top: "24.5%",
    height: "56.5%",
    width: "80%",
  },
  miniBoard: {
    position: "absolute",
    top: "24.5%",
    contentFit: "contain",
    height: "56.5%",
    width: "80%",
  },
  roadTitle: {
    marginVertical: "15.05%",
    fontFamily: "UbuntuMono-Bold",
  },
});
