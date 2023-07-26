import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import * as Haptics from "expo-haptics";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import SmallBoard from "../components/SmallBoard";
import PlayButton from "../components/PlayButton";
import SearchOptionButtons from "../components/SearchOptionButtons";
import InputBoard from "../components/InputBoard";

export default function InputScreen() {
  const emptyGrid = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""], //28 rows
  ];
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const textStyle = [styles.text, { color: colors[themeT].text }];

  //States
  const [input, setInput] = useState("");
  const [inputGrid, setInputGrid] = useState(emptyGrid);
  const [inputGridHistory, setInputGridHistory] = useState([emptyGrid]);

  //Contexts
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
    setInput((input) => input + "B");
    setInputGrid(updateInputGrid(input, inputGrid));
  };
  const playerButtonHandler = () => {
    setInput((input) => input + "P");
    setInputGrid(updateInputGrid(input, inputGrid));
  };
  const searchButtonHandler = () => {};
  const clearButtonHandler = () => {
    setInput("");
    setInputGrid(emptyGrid);
  };

  function updateInputGrid(input: string, inputGrid: Array<string[]>) {
    let prevRow = 0;
    let prevColumn = 0;
    let currentColumn = 0;
    let currentRow = 0;
    let maxColumn = 29;
    let maxRow = 5;
    let topColumnPointer = 0;
    let grid = inputGrid;

    function getCurrentPosition() {
      return [currentRow, currentColumn];
    }
    function setCurrentPosition(row: number, column: number) {
      currentRow = row;
      currentColumn = column;
    }

    function getPrevPosition() {
      return [prevRow, prevColumn];
    }

    function setPrevPosition(row: number, column: number) {
      prevRow = row;
      prevColumn = column;
    }

    function getInputAtPosition(position: number[]) {
      return grid[position[0]][position[1]];
    }

    function setInputAtPosition(position: number[], input: string) {
      grid[position[0]][position[1]] = input;
    }
    function getColumnPointerPosition() {
      return [0, topColumnPointer];
    }
    function advanceColumnPointerPosition() {
      topColumnPointer = currentColumn;
    }
    function setNextInput(input: string) {
      const prevPos = getPrevPosition();
      const prevInput = getInputAtPosition(prevPos);
      if (prevInput === input) {
        // if prev input === current input (same color):
        if (
          // check if current column is max row or next row is blocked:
          // if yes, move to next column in the same row, and update column pointer
          currentRow === maxRow ||
          grid[currentRow + 1][currentColumn] !== ""
        ) {
          //move rightwards
          setPrevPosition(currentRow, currentColumn);
          setCurrentPosition(currentRow, currentColumn + 1);
          setInputAtPosition(getCurrentPosition(), input);
          advanceColumnPointerPosition();
        } else {
          // not blocked, not max row -> move to next row in the same column
          setPrevPosition(currentRow, currentColumn);
          setCurrentPosition(currentRow + 1, currentColumn);
          setInputAtPosition(getCurrentPosition(), input);
        }
      } else {
        // if prev input !== current input:
        // move to the next column and update column pointer
        setPrevPosition(currentRow, currentColumn);
        setCurrentPosition(0, currentColumn + 1);
        advanceColumnPointerPosition();
      }
    }
    for (let i = 0; i < input.length; i++) {
      console.log(input[i]);
      setNextInput(input[i]);
    }
    return grid;
  }
  useEffect(() => {
    updateInputGrid(input, inputGrid);
    return () => {
      console.log("clean up");
    };
  }, [input, inputGrid]);
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
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect={false}
            maxLength={26}
            keyboardAppearance={theme === "light" ? "light" : "dark"}
            theme={{ dark: theme === "light" ? false : true }}
          />
          <View style={styles.boardCont}>
            <SmallBoard style={styles.smallBoard} />
            <InputBoard style={styles.inputBoard} inputGrid={inputGrid} />
          </View>
          <View style={styles.buttonMainCont}>
            <View style={styles.leftRightContOuter}>
              <PlayButton
                icon={"undo"}
                fontSize={35}
                contentStyle={{ marginLeft: 16 }}
                height="35%"
                width="37%"
                onPress={leftButtonHandler}
                buttonColor={colors[themeT].undo}
              />
              <View style={styles.leftRightContBottom}>
                <PlayButton
                  icon={"arrow-right-thick"}
                  fontSize={40}
                  contentStyle={{ marginLeft: 16 }}
                  height="45%"
                  width="30%"
                  buttonColor={colors[themeT].left}
                  onPress={leftButtonHandler}
                />
                <PlayButton
                  icon={"arrow-left-thick"}
                  fontSize={40}
                  contentStyle={{ marginLeft: 16 }}
                  height="45%"
                  width="30%"
                  buttonColor={colors[themeT].right}
                  onPress={rightButtonHandler}
                />
              </View>
            </View>

            <View style={styles.searchOptionsCont}>
              <SearchOptionButtons />
              <PlayButton
                title={"Search"}
                height="40%"
                fontSize={15}
                onPress={searchButtonHandler}
                buttonColor={colors[themeT].search}
              />
            </View>
            <View style={styles.leftRightContOuter}>
              <PlayButton
                icon={"eraser"}
                fontSize={35}
                contentStyle={{ marginLeft: 16 }}
                height="35%"
                width="37%"
                onPress={clearButtonHandler}
                buttonColor={colors[themeT].clear}
              />
              <View style={styles.leftRightContBottom}>
                <PlayButton
                  title="P"
                  fontSize={18}
                  height="45%"
                  width="30%"
                  onPress={playerButtonHandler}
                  buttonColor={colors[themeT].player}
                />
                <PlayButton
                  title="B"
                  fontSize={18}
                  height="45%"
                  width="30%"
                  onPress={bankerButtonHandler}
                  buttonColor={colors[themeT].banker}
                />
              </View>
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
    flex: 0.13,
    width: "60%",
    mode: "flat",
    textAlign: "center",
  },
  boardCont: {
    flex: 0.5,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBoard: {
    flex: 1,
    position: "absolute",
    height: "82%",
    width: "90%",
  },
  smallBoard: {
    height: "82%",
    width: "90%",
    resizeMode: "contain",
  },
  buttonMainCont: {
    flex: 0.4,
    flexDirection: "row",
  },
  leftRightContOuter: {
    flex: 0.35,
    width: "30%",
    flexDirection: "column",
    alignItems: "center",
  },
  leftRightContBottom: {
    height: "100%",
    flexDirection: "row",
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
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginRight: 20,
  },
});
