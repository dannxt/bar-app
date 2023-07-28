import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Keyboard } from "react-native";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import MiniBoard from "../components/MiniBoard";

export default function ResultScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const searchResultA =
    "BPBPBPBPBPBPBPBPBPBBBBBBBBBBBBBBBBBBBBBBBBBBBBPPPPPPPPPPPPPPPPPP";
  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <LinearGradient
        colors={["black", "transparent"]}
        start={[0, 0]}
        end={[1, 0]}
        locations={[0, 0.005]}
        style={[
          styles.container,
          { backgroundColor: colors[themeT].background },
        ]}
      >
        <View style={styles.boardCont}>
          <MiniBoard style={styles.MiniBoard} />
          <MiniBoard style={styles.MiniBoard} />
          <MiniBoard style={styles.MiniBoard} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boardCont: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  MiniBoard: {
    flex: 0.26,
    resizeMode: "contain",
  },
});
