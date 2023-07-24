import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import SmallBoard from "../components/SmallBoard";
import PlayButton from "../components/PlayButton";
import SearchOptionButtons from "../components/SearchOptionButtons";

export default function InputScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const textStyle = [styles.text, { color: colors[themeT].text }];
  const [input, setInput] = useState("");
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);

  const undoButtonHandler = () => {
    console.log("undo button pressed");
  };
  const leftButtonHandler = () => {
    console.log("left button pressed");
  };
  const rightButtonHandler = () => {
    console.log("right button pressed");
  };
  const bankerButtonHandler = () => {
    console.log("banker button pressed");
  };
  const playerButtonHandler = () => {
    console.log("player button pressed");
  };
  const searchButtonHandler = () => {
    console.log("search button pressed");
  };

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
        <View style={styles.innerCont}>
          <TextInput
            style={[styles.textInput, { height: 0.1 * deviceHeight }]}
            value={input}
            onChangeText={(text) => setInput(text)}
            keyboardAppearance={theme === "light" ? "light" : "dark"}
            theme={{ dark: theme === "light" ? false : true }}
          />
          <SmallBoard style={styles.smallBoard} />
          <View style={styles.buttonMainCont}>
            <View style={styles.leftRightContOuter}>
              <PlayButton
                icon={"arrow-left-top-bold"}
                fontSize={40}
                contentStyle={{ marginLeft: 16 }}
                onPress={undoButtonHandler}
              />
              <View style={styles.leftRightContInner}>
                <PlayButton
                  icon={"arrow-left-thick"}
                  fontSize={40}
                  contentStyle={{ marginLeft: 16 }}
                  onPress={leftButtonHandler}
                />
                <PlayButton
                  icon={"arrow-right-thick"}
                  fontSize={40}
                  contentStyle={{ marginLeft: 16 }}
                  onPress={rightButtonHandler}
                />
              </View>
            </View>

            <View style={styles.searchOptionsCont}>
              <SearchOptionButtons />
              <PlayButton
                title={"Search"}
                fontSize={15}
                onPress={searchButtonHandler}
                buttonColor={colors[themeT].search}
              />
            </View>
            <View style={styles.playerBankerCont}>
              <PlayButton
                title={"Banker"}
                fontSize={12}
                onPress={bankerButtonHandler}
                buttonColor={colors[themeT].banker}
              />
              <PlayButton
                title={"Player"}
                fontSize={12}
                onPress={playerButtonHandler}
                buttonColor={colors[themeT].player}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerCont: {
    flex: 1,
    paddingTop: "2%",
    paddingBottom: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "80%",
    mode: "flat",
    textAlign: "center",
  },
  smallBoard: {
    flex: 0.6,
    resizeMode: "contain",
    width: "90%",
  },
  buttonMainCont: {
    flex: 0.4,
    flexDirection: "row",
  },
  leftRightContOuter: {
    flex: 0.35,
    width: "30%",
    flexDirection: "column",
  },
  leftRightContInner: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  searchOptionsCont: {
    flex: 0.3,
    width: "30%",
    justifyContent: "space-evenly",
  },
  playerBankerCont: {
    flex: 0.35,
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 20,
    marginRight: 20,
  },
});
