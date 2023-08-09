import { useEffect, useContext, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { SearchResultGridContext } from "../contexts/SearchResultGridContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { routeDataList9, routeDataList3, routeDataList4 } from "../../App";
import colors from "../themes/colors";
import InputBoard from "../components/InputBoard";
import ModalResult from "../components/Modals/ModalResult";
import NumberTextView from "../components/NumberTextView";
import PlayButton from "../components/PlayButton";
import SmallBoardImage from "../components/SmallBoardImage";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";
import * as Device from "expo-device";

// aws testing and imports
import { invoke } from "../aws-lambda/invoke";

export default function InputScreen({ navigation }: any) {
  //contexts
  const { theme }: any = useContext(ThemeContext);
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { setSearchResultGridHandler } = useContext(SearchResultGridContext);

  //variables
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
  const emptyResultGrid = [
    [
      { key: 1, value: "", match: "no", mark: "no" },
      { key: 2, value: "", match: "no", mark: "no" },
      { key: 3, value: "", match: "no", mark: "no" },
      { key: 4, value: "", match: "no", mark: "no" },
      { key: 5, value: "", match: "no", mark: "no" },
      { key: 6, value: "", match: "no", mark: "no" },
      { key: 7, value: "", match: "no", mark: "no" },
      { key: 8, value: "", match: "no", mark: "no" },
      { key: 9, value: "", match: "no", mark: "no" },
    ],
    [
      { key: 10, value: "", match: "no", mark: "no" },
      { key: 11, value: "", match: "no", mark: "no" },
      { key: 12, value: "", match: "no", mark: "no" },
      { key: 13, value: "", match: "no", mark: "no" },
      { key: 14, value: "", match: "no", mark: "no" },
      { key: 15, value: "", match: "no", mark: "no" },
      { key: 16, value: "", match: "no", mark: "no" },
      { key: 17, value: "", match: "no", mark: "no" },
      { key: 18, value: "", match: "no", mark: "no" },
    ],
    [
      { key: 19, value: "", match: "no", mark: "no" },
      { key: 20, value: "", match: "no", mark: "no" },
      { key: 21, value: "", match: "no", mark: "no" },
      { key: 22, value: "", match: "no", mark: "no" },
      { key: 23, value: "", match: "no", mark: "no" },
      { key: 24, value: "", match: "no", mark: "no" },
      { key: 25, value: "", match: "no", mark: "no" },
      { key: 26, value: "", match: "no", mark: "no" },
      { key: 27, value: "", match: "no", mark: "no" },
    ],
    [
      { key: 28, value: "", match: "no", mark: "no" },
      { key: 29, value: "", match: "no", mark: "no" },
      { key: 30, value: "", match: "no", mark: "no" },
      { key: 31, value: "", match: "no", mark: "no" },
      { key: 32, value: "", match: "no", mark: "no" },
      { key: 33, value: "", match: "no", mark: "no" },
      { key: 34, value: "", match: "no", mark: "no" },
      { key: 35, value: "", match: "no", mark: "no" },
      { key: 36, value: "", match: "no", mark: "no" },
    ],
    [
      { key: 37, value: "", match: "no", mark: "no" },
      { key: 38, value: "", match: "no", mark: "no" },
      { key: 39, value: "", match: "no", mark: "no" },
      { key: 40, value: "", match: "no", mark: "no" },
      { key: 41, value: "", match: "no", mark: "no" },
      { key: 42, value: "", match: "no", mark: "no" },
      { key: 43, value: "", match: "no", mark: "no" },
      { key: 44, value: "", match: "no", mark: "no" },
      { key: 45, value: "", match: "no", mark: "no" },
    ],
    [
      { key: 46, value: "", match: "no", mark: "no" },
      { key: 47, value: "", match: "no", mark: "no" },
      { key: 48, value: "", match: "no", mark: "no" },
      { key: 49, value: "", match: "no", mark: "no" },
      { key: 50, value: "", match: "no", mark: "no" },
      { key: 51, value: "", match: "no", mark: "no" },
      { key: 52, value: "", match: "no", mark: "no" },
      { key: 53, value: "", match: "no", mark: "no" },
      { key: 54, value: "", match: "no", mark: "no" },
    ],
    [
      { key: 55, value: "", match: "no", mark: "no" },
      { key: 56, value: "", match: "no", mark: "no" },
      { key: 57, value: "", match: "no", mark: "no" },
      { key: 58, value: "", match: "no", mark: "no" },
      { key: 59, value: "", match: "no", mark: "no" },
      { key: 60, value: "", match: "no", mark: "no" },
      { key: 61, value: "", match: "no", mark: "no" },
      { key: 62, value: "", match: "no", mark: "no" },
      { key: 63, value: "", match: "no", mark: "no" },
    ],
    [
      { key: 64, value: "", match: "no", mark: "no" },
      { key: 65, value: "", match: "no", mark: "no" },
      { key: 66, value: "", match: "no", mark: "no" },
      { key: 67, value: "", match: "no", mark: "no" },
      { key: 68, value: "", match: "no", mark: "no" },
      { key: 69, value: "", match: "no", mark: "no" },
      { key: 70, value: "", match: "no", mark: "no" },
      { key: 71, value: "", match: "no", mark: "no" },
      { key: 72, value: "", match: "no", mark: "no" },
    ],
  ];
  const themeT = theme as keyof typeof colors;
  const textColor = { color: colors[themeT].text };
  const searchingColor = colors[themeT].searching;
  const searchColor = colors[themeT].search;

  //states
  const [input, setInput] = useState("");
  const [inputHistory, setInputHistory] = useState([""]);
  const [inputGrid, setInputGrid] = useState(emptyGrid);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCurrentlySearching, setIsCurrentlySearching] = useState(false);
  const [searchTitle, setSearchTitle] = useState("Search");

  //handlers
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  //haptics
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  function attemptSearch(
    searchString: string,
    routeDataList: string[],
    routeNumber: number
  ) {
    let matchFound = false;
    for (const [index, routeData] of routeDataList.entries()) {
      let matchString = findResultString(routeData, searchString);
      if (matchString.length > 0) {
        matchFound = true;
        const resultGrid = convertToNestedResultObjects(
          matchString,
          searchString.length
        );
        setSearchResultGridHandler(resultGrid, routeNumber);
        break; // Exit the loop when a match is found
      }
    }
    return { routeNumber, matchFound };
  }

  //functions
  const gridHistoryHandler = () => {
    if (input !== inputHistory[inputHistory.length - 1]) {
      if (inputHistory.length < 6) {
        setInputHistory((prevHistory) => [...prevHistory, input]);
      } else {
        setInputHistory((prevHistory) => [...prevHistory.slice(1), input]);
      }
    }
  };
  const undoButtonHandler = () => {
    if (inputHistory.length > 1) {
      const previousInputs = inputHistory.slice(0, -1);
      setInput(previousInputs[previousInputs.length - 1]);
      setInputHistory(previousInputs);
    }
  };
  const leftButtonHandler = () => {
    setInput((input) => input.slice(1));
  };
  const rightButtonHandler = () => {
    setInput((input) => input.slice(0, -1));
  };
  const bankerButtonHandler = () => {
    if (Platform.OS === "ios") {
      triggerHaptic();
    }
    if (input.length < 28) {
      setInput((input) => input + "B");
    }
  };
  const playerButtonHandler = () => {
    if (Platform.OS === "ios") {
      triggerHaptic();
    }
    if (input.length < 28) {
      setInput((input) => input + "P");
    }
  };
  const searchButtonHandler = () => {
    setIsCurrentlySearching(true);
    setSearchTitle("Searching...");
    requestAnimationFrame(() => {
      let matchResults = [];
      let hasOneMatch = false;
      matchResults.push(attemptSearch(input, routeDataList9, 9));
      matchResults.push(attemptSearch(input, routeDataList3, 3));
      matchResults.push(attemptSearch(input, routeDataList4, 4));
      setIsCurrentlySearching(false);
      setSearchTitle("Search");
      matchResults.forEach((result) => {
        if (!result.matchFound) {
          setSearchResultGridHandler(emptyResultGrid, result.routeNumber);
        } else {
          hasOneMatch = true;
        }
      });
      hasOneMatch ? toggleModal() : noMatchToastHandler();
    });
  };
  const clearButtonHandler = () => {
    setInput("");
  };
  // helper Functions
  function findResultString(mainString: string, searchString: string) {
    const index = mainString.indexOf(searchString);
    if (index === -1) {
      return "";
    }
    const maxLength = mainString.length - index;
    const desiredLength = Math.min(searchString.length + 18, maxLength);
    return mainString.slice(index, index + desiredLength);
  }
  function convertToNestedResultObjects(
    searchString: string,
    numMatches: number,
    totalLen: number = 72
  ) {
    const nestedLists = [];
    let columnList = [];
    for (let i = 1; i <= totalLen; i++) {
      const item = {
        key: i,
        value: searchString[i - 1] ? searchString[i - 1] : "",
        match: i <= numMatches ? "yes" : "no",
        mark: "no",
      };
      columnList.push(item);

      if (i % 9 == 0) {
        nestedLists.push(columnList);
        columnList = [];
      }
    }
    return nestedLists;
  }
  function createGrid(input: string) {
    let currentColumn = 0;
    let currentRow = 0;
    let maxRow = 5;
    let topColumnPointer = 0;
    let grid = emptyGrid;

    function getCurrentPosition() {
      return [currentRow, currentColumn];
    }

    function setGridAtPosition(position: number[], char: string) {
      grid[position[1]][position[0]] = char;
    }

    let prevInput = "";

    for (const currInput of input) {
      if (prevInput === "" || prevInput === currInput) {
        if (
          currentRow === maxRow ||
          grid[currentColumn][currentRow + 1] !== "" ||
          (currentColumn >= 1 &&
            grid[currentColumn - 1][currentRow + 1] === currInput) ||
          (currentRow + 2 <= maxRow &&
            grid[currentColumn][currentRow + 2] === currInput)
        ) {
          setGridAtPosition(getCurrentPosition(), currInput);
          currentColumn++;
        } else {
          setGridAtPosition(getCurrentPosition(), currInput);
          currentRow++;
        }
      } else if (prevInput !== currInput) {
        topColumnPointer++;
        currentColumn = topColumnPointer;
        currentRow = 0;
        setGridAtPosition(getCurrentPosition(), currInput);
        currentRow = 1;
      }
      prevInput = currInput;
    }
    return grid;
  }

  // effects
  useEffect(() => {
    gridHistoryHandler();
    setInputGrid(createGrid(input));
  }, [input]);

  //notifications and toasts
  const noMatchToastHandler = () => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "No Match!",
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  // UI/IX misc
  // Get the device model and adjust the circle margin accordingly
  let inputFontSize = deviceWidth * 0.0365;
  switch (Device.modelName) {
    case "iPhone 12":
      inputFontSize = 0.03575 * deviceWidth;
      break;

    case "iPhone 14 Plus":
      inputFontSize = 0.0365 * deviceWidth;
      break;
  }

  return (
    <Pressable onPressIn={() => Keyboard.dismiss()} style={styles.container}>
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
        <ModalResult
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />
        <View style={styles.innerCont}>
          <NumberTextView inputLength={input.length} />
          <View
            style={{
              flex: 0.16,
              width: "90%",
              flexDirection: "row",
            }}
          >
            <TextInput
              style={[
                textColor,
                {
                  backgroundColor: colors[themeT].textInput,
                  flex: 1,
                  fontSize: inputFontSize,
                  fontFamily: "UbuntuMono-Bold",
                  textAlign: "justify",
                  paddingLeft: deviceWidth * 0.025,
                  paddingRight: deviceWidth * 0.02,
                  paddingTop: deviceHeight * 0.035,
                  marginHorizontal: 0,
                  borderRadius: 3,
                },
              ]}
              value={input}
              onChangeText={(text) => setInput(text)}
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              autoCorrect={false}
              maxLength={28}
              selectTextOnFocus={false}
              keyboardAppearance={theme === "light" ? "light" : "dark"}
            />
          </View>
          <View style={styles.boardCont}>
            <SmallBoardImage style={styles.smallBoardImage} />
            <InputBoard
              style={{
                board: styles.inputBoard,
                circle: styles.inputBoardCircle,
              }}
              inputGrid={inputGrid}
              numColumns={28}
            />
          </View>
          <View style={styles.buttonMainCont}>
            <View style={styles.leftRightContOuter}>
              <PlayButton
                icon={"undo"}
                fontSize={deviceWidth * 0.05}
                contentStyle={{ marginLeft: 16 }}
                height="32%"
                width="37%"
                buttonColor={colors[themeT].undo}
                onPressIn={undoButtonHandler}
              />
              <View style={styles.leftRightContBottom}>
                <PlayButton
                  icon={"arrow-right-thick"}
                  fontSize={deviceWidth * 0.045}
                  contentStyle={{ marginLeft: 16 }}
                  height="45%"
                  width="30%"
                  buttonColor={colors[themeT].left}
                  onPressIn={leftButtonHandler}
                />
                <PlayButton
                  icon={"arrow-left-thick"}
                  fontSize={deviceWidth * 0.045}
                  contentStyle={{ marginLeft: 16 }}
                  height="45%"
                  width="30%"
                  buttonColor={colors[themeT].right}
                  onPressIn={rightButtonHandler}
                />
              </View>
            </View>

            <View style={styles.searchOptionsCont}>
              <PlayButton
                title={searchTitle}
                height="50%"
                fontSize={deviceWidth * 0.016}
                onPressIn={searchButtonHandler}
                buttonColor={
                  isCurrentlySearching ? searchingColor : searchColor
                }
              />
            </View>
            <View style={styles.leftRightContOuter}>
              <PlayButton
                icon={"eraser"}
                fontSize={deviceWidth * 0.035}
                contentStyle={{ marginLeft: 16 }}
                height="32%"
                width="37%"
                onPressIn={clearButtonHandler}
                buttonColor={colors[themeT].clear}
              />
              <View style={styles.leftRightContBottom}>
                <PlayButton
                  title="P"
                  fontSize={deviceWidth * 0.02}
                  height="45%"
                  width="25%"
                  onPressIn={playerButtonHandler}
                  buttonColor={colors[themeT].player}
                  borderRadius={60}
                />
                <PlayButton
                  title="B"
                  fontSize={deviceWidth * 0.02}
                  height="45%"
                  width="25%"
                  onPressIn={bankerButtonHandler}
                  buttonColor={colors[themeT].banker}
                  borderRadius={60}
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
    paddingTop: "1.6%",
    paddingBottom: "0.8%",
    alignItems: "center",
    justifyContent: "center",
  },
  boardCont: {
    flex: 0.5,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  smallBoardImage: {
    flex: 0.815,
    height: "81.5%",
    width: "90%",
    contentFit: "contain",
  },
  inputBoard: {
    flex: 1,
    position: "absolute",
    height: "81.5%",
    width: "90%",
  },
  inputBoardCircle: {},
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
    marginLeft: "1.2%",
    width: "30%",
    justifyContent: "space-evenly",
  },
  playerBankerCont: {
    flex: 0.35,
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
