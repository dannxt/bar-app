import { useEffect, useContext, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Platform,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { SearchResultGridContext } from "../contexts/SearchResultGridContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { InputLengthContext } from "../contexts/InputLengthContext";
import { routeDataList_9, routeDataList_3, routeDataList_4 } from "../../App";
import colors from "../themes/colors";
import InputBoard from "../components/InputBoard";
import ModalResult from "../components/Modals/ModalResult";
import NumberTextView from "../components/NumberTextView";
import PlayButton from "../components/PlayButton";
import SmallBoardImage from "../components/SmallBoardImage";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";
import * as Device from "expo-device";

export default function InputScreen({ navigation }: any) {
  // datas
  const routeDataMaps: {
    route_9: string[];
    route_3: string[];
    route_4: string[];
  } = {
    route_9: routeDataList_9,
    route_3: routeDataList_3,
    route_4: routeDataList_4,
  };

  //contexts
  const { theme }: any = useContext(ThemeContext);
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { setSearchResultGridHandler } = useContext(SearchResultGridContext);
  const { inputLength, setInputLengthHandler } = useContext(InputLengthContext);

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
      { key: 1, value: "", match: "no", secondMatch: "no" },
      { key: 2, value: "", match: "no", secondMatch: "no" },
      { key: 3, value: "", match: "no", secondMatch: "no" },
      { key: 4, value: "", match: "no", secondMatch: "no" },
      { key: 5, value: "", match: "no", secondMatch: "no" },
      { key: 6, value: "", match: "no", secondMatch: "no" },
      { key: 7, value: "", match: "no", secondMatch: "no" },
      { key: 8, value: "", match: "no", secondMatch: "no" },
      { key: 9, value: "", match: "no", secondMatch: "no" },
    ],
    [
      { key: 10, value: "", match: "no", secondMatch: "no" },
      { key: 11, value: "", match: "no", secondMatch: "no" },
      { key: 12, value: "", match: "no", secondMatch: "no" },
      { key: 13, value: "", match: "no", secondMatch: "no" },
      { key: 14, value: "", match: "no", secondMatch: "no" },
      { key: 15, value: "", match: "no", secondMatch: "no" },
      { key: 16, value: "", match: "no", secondMatch: "no" },
      { key: 17, value: "", match: "no", secondMatch: "no" },
      { key: 18, value: "", match: "no", secondMatch: "no" },
    ],
    [
      { key: 19, value: "", match: "no", secondMatch: "no" },
      { key: 20, value: "", match: "no", secondMatch: "no" },
      { key: 21, value: "", match: "no", secondMatch: "no" },
      { key: 22, value: "", match: "no", secondMatch: "no" },
      { key: 23, value: "", match: "no", secondMatch: "no" },
      { key: 24, value: "", match: "no", secondMatch: "no" },
      { key: 25, value: "", match: "no", secondMatch: "no" },
      { key: 26, value: "", match: "no", secondMatch: "no" },
      { key: 27, value: "", match: "no", secondMatch: "no" },
    ],
    [
      { key: 28, value: "", match: "no", secondMatch: "no" },
      { key: 29, value: "", match: "no", secondMatch: "no" },
      { key: 30, value: "", match: "no", secondMatch: "no" },
      { key: 31, value: "", match: "no", secondMatch: "no" },
      { key: 32, value: "", match: "no", secondMatch: "no" },
      { key: 33, value: "", match: "no", secondMatch: "no" },
      { key: 34, value: "", match: "no", secondMatch: "no" },
      { key: 35, value: "", match: "no", secondMatch: "no" },
      { key: 36, value: "", match: "no", secondMatch: "no" },
    ],
    [
      { key: 37, value: "", match: "no", secondMatch: "no" },
      { key: 38, value: "", match: "no", secondMatch: "no" },
      { key: 39, value: "", match: "no", secondMatch: "no" },
      { key: 40, value: "", match: "no", secondMatch: "no" },
      { key: 41, value: "", match: "no", secondMatch: "no" },
      { key: 42, value: "", match: "no", secondMatch: "no" },
      { key: 43, value: "", match: "no", secondMatch: "no" },
      { key: 44, value: "", match: "no", secondMatch: "no" },
      { key: 45, value: "", match: "no", secondMatch: "no" },
    ],
    [
      { key: 46, value: "", match: "no", secondMatch: "no" },
      { key: 47, value: "", match: "no", secondMatch: "no" },
      { key: 48, value: "", match: "no", secondMatch: "no" },
      { key: 49, value: "", match: "no", secondMatch: "no" },
      { key: 50, value: "", match: "no", secondMatch: "no" },
      { key: 51, value: "", match: "no", secondMatch: "no" },
      { key: 52, value: "", match: "no", secondMatch: "no" },
      { key: 53, value: "", match: "no", secondMatch: "no" },
      { key: 54, value: "", match: "no", secondMatch: "no" },
    ],
    [
      { key: 55, value: "", match: "no", secondMatch: "no" },
      { key: 56, value: "", match: "no", secondMatch: "no" },
      { key: 57, value: "", match: "no", secondMatch: "no" },
      { key: 58, value: "", match: "no", secondMatch: "no" },
      { key: 59, value: "", match: "no", secondMatch: "no" },
      { key: 60, value: "", match: "no", secondMatch: "no" },
      { key: 61, value: "", match: "no", secondMatch: "no" },
      { key: 62, value: "", match: "no", secondMatch: "no" },
      { key: 63, value: "", match: "no", secondMatch: "no" },
    ],
    [
      { key: 64, value: "", match: "no", secondMatch: "no" },
      { key: 65, value: "", match: "no", secondMatch: "no" },
      { key: 66, value: "", match: "no", secondMatch: "no" },
      { key: 67, value: "", match: "no", secondMatch: "no" },
      { key: 68, value: "", match: "no", secondMatch: "no" },
      { key: 69, value: "", match: "no", secondMatch: "no" },
      { key: 70, value: "", match: "no", secondMatch: "no" },
      { key: 71, value: "", match: "no", secondMatch: "no" },
      { key: 72, value: "", match: "no", secondMatch: "no" },
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

  //haptics
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // handlers and toggles
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
    if (input != "") {
      setIsCurrentlySearching(true);
      setSearchTitle("Searching...");
      requestAnimationFrame(() => {
        let searchResultObj = advancedSearch(input, routeDataMaps);
        if (searchResultObj.hasResult) {
          setSearchResultGridHandler(
            convertToNestedResultObj(
              searchResultObj.route_9,
              input.length,
              72,
              searchResultObj.diff_9
            ),
            "route_9"
          );
          setSearchResultGridHandler(
            convertToNestedResultObj(
              searchResultObj.route_3,
              input.length,
              72,
              searchResultObj.diff_3
            ),
            "route_3"
          );
          setSearchResultGridHandler(
            convertToNestedResultObj(
              searchResultObj.route_4,
              input.length,
              72,
              searchResultObj.diff_4
            ),
            "route_4"
          );
          requestAnimationFrame(() => {
            setModalVisible(true);
          });
        } else {
          // if no match found, painttheboard, call noMatchToastHandler();
          noMatchToastHandler();
        }
        setIsCurrentlySearching(false);
        setSearchTitle("Search");
      });
    }
  };
  const clearButtonHandler = () => {
    setInput("");
  };

  // CONSTANTS
  const TRAILING_LEN = 18;
  const MAX_SECONDARY_MATCHES = 6;
  const MAX_BASE_SEARCH_MATCHES = 1;

  //functions
  function findAllMatchingIndices(mainString: string, searchString: string) {
    const sLen = searchString.length;
    const mLen = mainString.length;
    const indices = [];
    let index = mainString.indexOf(searchString);
    while (index !== -1 && index + sLen + TRAILING_LEN <= mLen) {
      indices.push(index);
      index = mainString.indexOf(searchString, index + 1);
    }
    return indices;
  }
  function convertToNestedResultObj(
    extendedResultString: string,
    numMatches: number,
    totalLen: number = 72,
    numSecondMatches: number = 0
  ) {
    const nestedLists = [];
    let columnList = [];
    for (let i = 1; i <= totalLen; i++) {
      const item = {
        key: i,
        value: extendedResultString[i - 1] ? extendedResultString[i - 1] : "",
        match: i <= numMatches ? "yes" : "no",
        secondMatch:
          numMatches < i && i <= numSecondMatches + numMatches ? "yes" : "no",
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
  function getTrailingLenStringResults(
    mainString: string,
    searchString: string,
    TRAILING_LEN: number,
    numResultsMax: number = MAX_BASE_SEARCH_MATCHES,
    searchInterval: number
  ) {
    // returns [matchedString + trailingLen]
    let results: string[] = [];
    let position = 0;
    let index = mainString.indexOf(searchString, position);
    while (results.length < numResultsMax && index !== -1) {
      if (index + searchString.length + TRAILING_LEN < mainString.length) {
        results.push(
          mainString.slice(index, index + searchString.length + TRAILING_LEN)
        );
      }
      //search every interval position
      position = index + searchInterval;
      index = mainString.indexOf(searchString, position);
    }
    return results;
  }
  function advancedSearch(searchString: string, routeDataMaps: object) {
    let resultsWithTrailing_9: any;
    let resultsWithTrailing_3: any;
    let resultsWithTrailing_4: any;
    let hasExtraMatches = false;
    let finalResultObj: {
      route_9: string;
      route_3: string;
      route_4: string;
      diff_9: number;
      diff_3: number;
      diff_4: number;
      hasResult: boolean;
    } = {
      route_9: "",
      route_3: "",
      route_4: "",
      diff_9: 0,
      diff_3: 0,
      diff_4: 0,
      hasResult: false,
    };
    function findMatchStringInList(
      searchString: string,
      routeList: string[],
      diff: number,
      searchInterval: number
    ) {
      let result = "";
      routeList.forEach((mainString: string) => {
        let position = 0;
        let idx = mainString.indexOf(searchString, position);
        while (idx < mainString.length && idx !== -1 && result === "") {
          result = mainString.slice(
            idx,
            idx + searchString.length - diff + TRAILING_LEN
          );
          // search every interval position
          position = idx + searchInterval;
          idx = mainString.indexOf(searchString, position);
        }
      });
      return result;
    }
    // Conduct first level search across all routes and return a list of trailingLen matchStrings (basic search)
    Object.entries(routeDataMaps).forEach(([routeNumber, routeData]) => {
      routeData.forEach((mainString: string) => {
        switch (routeNumber) {
          case "route_9":
            resultsWithTrailing_9 = getTrailingLenStringResults(
              mainString,
              searchString,
              TRAILING_LEN,
              MAX_BASE_SEARCH_MATCHES,
              9
            );
            break;
          case "route_3":
            resultsWithTrailing_3 = getTrailingLenStringResults(
              mainString,
              searchString,
              TRAILING_LEN,
              MAX_BASE_SEARCH_MATCHES,
              3
            );
            break;
          case "route_4":
            resultsWithTrailing_4 = getTrailingLenStringResults(
              mainString,
              searchString,
              TRAILING_LEN,
              MAX_BASE_SEARCH_MATCHES,
              4
            );
            break;
        }
      });
    });
    const lenOfTrailing_9 = resultsWithTrailing_9.length;
    const lenOfTrailing_3 = resultsWithTrailing_3.length;
    const lenOfTrailing_4 = resultsWithTrailing_4.length;

    // returns result in order of priority:
    // check for 9-3-4 matches
    if (lenOfTrailing_9 > 0 && lenOfTrailing_3 > 0 && lenOfTrailing_4 > 0) {
      let diff = MAX_SECONDARY_MATCHES;
      while (diff > 2 && !hasExtraMatches) {
        console.log("checking 934");
        console.log(`diff: ${diff}`);
        for (const string_9 of resultsWithTrailing_9) {
          const searchString = string_9.slice(
            0,
            string_9.length - TRAILING_LEN + diff
          );
          const string_9_in_3 = findMatchStringInList(
            searchString,
            routeDataMaps.route_3,
            diff,
            3
          );

          const string_9_in_4 = findMatchStringInList(
            searchString,
            routeDataMaps.route_4,
            diff,
            4
          );
          if (string_9_in_3 !== "" && string_9_in_4 !== "") {
            finalResultObj.route_9 = string_9;
            finalResultObj.route_3 = string_9_in_3;
            finalResultObj.route_4 = string_9_in_4;
            finalResultObj.diff_9 = diff;
            finalResultObj.diff_3 = diff;
            finalResultObj.diff_4 = diff;
            finalResultObj.hasResult = true;
            hasExtraMatches = true;
            break;
          }
        }
        diff--;
      }
    }
    // check for 9-3 matches
    if (lenOfTrailing_9 > 0 && lenOfTrailing_3 > 0) {
      let diff = MAX_SECONDARY_MATCHES;
      while (!hasExtraMatches && diff > 2) {
        for (const string_9 of resultsWithTrailing_9) {
          const searchString = string_9.slice(
            0,
            string_9.length - TRAILING_LEN + diff
          );
          const string_9_in_3 = findMatchStringInList(
            searchString,
            routeDataMaps.route_3,
            diff,
            3
          );
          if (string_9_in_3 !== "") {
            finalResultObj.route_9 = string_9;
            finalResultObj.route_3 = string_9_in_3 || resultsWithTrailing_3[0];
            finalResultObj.route_4 =
              lenOfTrailing_4 > 0 ? resultsWithTrailing_4[0] : "";
            finalResultObj.diff_9 = diff;
            finalResultObj.diff_3 = diff;
            finalResultObj.diff_4 = 0;
            finalResultObj.hasResult = true;
            hasExtraMatches = true;
            break;
          }
        }

        diff--;
      }
    }
    // check for 9-4 matches
    if (lenOfTrailing_9 > 0 && lenOfTrailing_4 > 0) {
      let diff = MAX_SECONDARY_MATCHES;
      while (!hasExtraMatches && diff > 2) {
        for (const string_9 of resultsWithTrailing_9) {
          const searchString = string_9.slice(
            0,
            string_9.length - TRAILING_LEN + diff
          );
          const string_9_in_4 = findMatchStringInList(
            searchString,
            routeDataMaps.route_4,
            diff,
            4
          );
          if (string_9_in_4 !== "") {
            finalResultObj.route_9 = string_9;
            finalResultObj.route_3 =
              lenOfTrailing_3 > 0 ? resultsWithTrailing_3[0] : "";
            finalResultObj.route_4 = string_9_in_4 || resultsWithTrailing_4[0];
            finalResultObj.diff_9 = diff;
            finalResultObj.diff_3 = 0;
            finalResultObj.diff_4 = diff;
            finalResultObj.hasResult = true;
            hasExtraMatches = true;
            break;
          }
        }
        diff--;
      }
    }
    // check for 3-4 matches
    if (lenOfTrailing_3 > 0 && lenOfTrailing_4 > 0) {
      let diff = MAX_SECONDARY_MATCHES;
      while (!hasExtraMatches && diff > 2) {
        for (const string_3 of resultsWithTrailing_3) {
          const searchString = string_3.slice(
            0,
            string_3.length - TRAILING_LEN + diff
          );
          const string_3_in_4 = findMatchStringInList(
            searchString,
            routeDataMaps.route_4,
            diff,
            4
          );
          if (string_3_in_4 !== "") {
            finalResultObj.route_9 =
              lenOfTrailing_9 > 0 ? resultsWithTrailing_9[0] : "";
            finalResultObj.route_3 = string_3;
            finalResultObj.route_4 = string_3_in_4 || resultsWithTrailing_4[0];
            finalResultObj.diff_9 = 0;
            finalResultObj.diff_3 = diff;
            finalResultObj.diff_4 = diff;
            finalResultObj.hasResult = true;
            hasExtraMatches = true;
            break;
          }
        }
        diff--;
      }
    }
    // no match (return basic)
    if (!hasExtraMatches) {
      finalResultObj.route_9 =
        lenOfTrailing_9 > 0 ? resultsWithTrailing_9[0] : "";
      finalResultObj.route_3 =
        lenOfTrailing_3 > 0 ? resultsWithTrailing_3[0] : "";
      finalResultObj.route_4 =
        lenOfTrailing_4 > 0 ? resultsWithTrailing_4[0] : "";
      if (lenOfTrailing_9 + lenOfTrailing_3 + lenOfTrailing_4 > 0) {
        finalResultObj.hasResult = true;
      }
    }
    return finalResultObj;
  }

  useEffect(() => {
    gridHistoryHandler();
    setInputGrid(createGrid(input));
    setInputLengthHandler(input.length);
  }, [input]);

  const noMatchToastHandler = () => {
    Toast.show({
      type: "notFound",
      position: "top",
      text1: "No Match Found",
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  // UI/IX misc
  // Get the device model and adjust the circle margin accordingly
  let inputFontSize;
  let letterSpacing;
  switch (Device.modelName) {
    case "iPhone 12":
      inputFontSize = 0.0258 * deviceWidth;
      letterSpacing = deviceWidth * 0.0074;
      break;

    case "iPhone 14 Plus":
      inputFontSize = 0.0265 * deviceWidth;
      letterSpacing = deviceWidth * 0.00705;
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
          inputLength={inputLength}
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
              letterSpacing={letterSpacing}
              style={[
                textColor,
                {
                  backgroundColor: colors[themeT].textInput,
                  flex: 1,
                  fontSize: inputFontSize,
                  fontFamily: "UbuntuMono-Bold",
                  textAlign: "justify",
                  paddingLeft: deviceWidth * 0.027,
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
              <Text
                style={{
                  fontSize: deviceWidth * 0.016,
                  textAlign: "center",
                  fontFamily: "UbuntuMono-Bold",
                  color: colors[themeT].text,
                }}
              >
                934
              </Text>
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
