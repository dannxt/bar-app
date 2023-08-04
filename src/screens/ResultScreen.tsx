import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Keyboard } from "react-native";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import MiniBoard from "../components/MiniBoard";
import MiniResultBoard from "../components/MiniResultBoard";
import { SearchResultGridContext } from "../contexts/SearchResultGridContext";

export default function ResultScreen() {
  //Contexts
  const { theme, toggleTheme }: any = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const textColor = { color: colors[themeT].text };
  const { searchResultsGrid9 } = useContext(SearchResultGridContext);

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
            <Text style={[textColor, styles.roadTitle]}>3 路</Text>
            <MiniBoard style={styles.miniBoard} />
          </View>
          <View style={styles.boardInnerCont}>
            <Text style={[textColor, styles.roadTitle]}>9 路</Text>
            <MiniBoard style={styles.miniBoard} />
            <MiniResultBoard
              style={styles.miniResultBoard}
              inputGrid={searchResultsGrid9}
              numColumns={8}
            />
          </View>
          <View style={styles.boardInnerCont}>
            <Text style={[textColor, styles.roadTitle]}>4 路</Text>
            <MiniBoard style={styles.miniBoard} />
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
    // borderWidth: 2,
    // borderColor: "yellow",
  },
  miniResultBoard: {
    position: "absolute",
    top: "24.5%",
    height: "56.5%",
    width: "80%",
    // borderWidth: 2,
    // borderColor: "red",
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
  },
});
