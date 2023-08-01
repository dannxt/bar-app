import { useEffect, useContext, useState } from "react";
import {
  Keyboard,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { SearchResultGridContext } from "../contexts/SearchResultGridContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { routeDataList } from "../../App";
import colors from "../themes/colors";
import InputBoard from "../components/InputBoard";
import ModalResult from "../components/Modals/ModalResult";
import NumberTextView from "../components/NumberTextView";
import PlayButton from "../components/PlayButton";
import SearchOptionButtons from "../components/SearchOptionButtons";
import SmallBoard from "../components/SmallBoard";
import Toast from "react-native-toast-message";

type routeDataList = string[];

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
  const themeT = theme as keyof typeof colors;
  const textColor = { color: colors[themeT].text };
  const fontScale = PixelRatio.getFontScale();
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

  function attemptSearch(searchString: string) {
    let matchFound = false;
    const start = performance.now();
    for (const [index, routeData] of routeDataList.entries()) {
      let matchString = findResultString(routeData, searchString);
      if (matchString.length > 0) {
        matchFound = true;
        console.log(`Found match in routeDataList${index + 1} !`);
        const resultGrid = convertToNestedResultObjects(
          matchString,
          searchString.length
        );
        setSearchResultGridHandler(resultGrid);
        toggleModal();
        break; // Exit the loop when a match is found
      } else {
        console.log(`Finish searching routeDataList${index + 1} !`);
      }
      const end = performance.now();
      console.log(`Searching took ${(end - start) / 1000} seconds to run`);
    }
    if (!matchFound) {
      noMatchToastHandler();
    }
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
    if (input.length < 28) {
      setInput((input) => input + "B");
    }
  };
  const playerButtonHandler = () => {
    if (input.length < 28) {
      setInput((input) => input + "P");
    }
  };
  const searchButtonHandler = () => {
    if (input !== "") {
      setIsCurrentlySearching(true);
      setSearchTitle("Searching...");
      setTimeout(() => {
        setIsCurrentlySearching(false);
        setSearchTitle("Search");
        attemptSearch(input);
      }, 0);
    }
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
      };
      columnList.push(item);

      if (i % 9 == 0) {
        nestedLists.push(columnList);
        columnList = [];
      }
    }
    return nestedLists;
  }
  const clearButtonHandler = () => {
    setInput("");
  };
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
  /* Test Codes */
  /*   const searchButtonHandler = () => {
    if (input !== "") {
      setIsCurrentlySearching(true);
    }
  };
  useEffect(() => {
    if (isCurrentlySearching) {
      attemptSearch(input);
    }
  }, [isCurrentlySearching]); */

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
          <NumberTextView />
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
                  fontSize: fontScale * 25,
                  fontFamily: "UbuntuMono-Bold",
                  textAlign: "justify",
                  justifyContent: "space-evenly",
                  paddingLeft: deviceWidth * 0.025,
                  paddingRight: deviceWidth * 0.02,
                  paddingTop: deviceHeight * 0.02,
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
            <Text
              style={[
                textColor,
                {
                  position: "absolute",
                  fontSize: fontScale * 9,
                  fontWeight: "bold",
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                },
              ]}
            >
              {input.length}
            </Text>
          </View>
          <View style={styles.boardCont}>
            <SmallBoard style={styles.smallBoard} />
            <InputBoard
              style={styles.inputBoard}
              inputGrid={inputGrid}
              numColumns={30}
            />
          </View>
          <View style={styles.buttonMainCont}>
            <View style={styles.leftRightContOuter}>
              <PlayButton
                icon={"undo"}
                fontSize={fontScale * 40}
                contentStyle={{ marginLeft: 16 }}
                height="35%"
                width="37%"
                buttonColor={colors[themeT].undo}
                onPressIn={undoButtonHandler}
              />
              <View style={styles.leftRightContBottom}>
                <PlayButton
                  icon={"arrow-right-thick"}
                  fontSize={fontScale * 40}
                  contentStyle={{ marginLeft: 16 }}
                  height="45%"
                  width="30%"
                  buttonColor={colors[themeT].left}
                  onPressIn={leftButtonHandler}
                />
                <PlayButton
                  icon={"arrow-left-thick"}
                  fontSize={fontScale * 40}
                  contentStyle={{ marginLeft: 16 }}
                  height="45%"
                  width="30%"
                  buttonColor={colors[themeT].right}
                  onPressIn={rightButtonHandler}
                />
              </View>
            </View>

            <View style={styles.searchOptionsCont}>
              {/* <SearchOptionButtons /> */}
              <PlayButton
                title={searchTitle}
                height="50%"
                fontSize={15}
                onPressIn={searchButtonHandler}
                buttonColor={
                  isCurrentlySearching ? searchingColor : searchColor
                }
              />
            </View>
            <View style={styles.leftRightContOuter}>
              <PlayButton
                icon={"eraser"}
                fontSize={fontScale * 30}
                contentStyle={{ marginLeft: 16 }}
                height="35%"
                width="37%"
                onPressIn={clearButtonHandler}
                buttonColor={colors[themeT].clear}
              />
              <View style={styles.leftRightContBottom}>
                <PlayButton
                  title="P"
                  fontSize={fontScale * 14}
                  height="45%"
                  width="30%"
                  onPressIn={playerButtonHandler}
                  buttonColor={colors[themeT].player}
                />
                <PlayButton
                  title="B"
                  fontSize={fontScale * 14}
                  height="45%"
                  width="30%"
                  onPressIn={bankerButtonHandler}
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
    paddingBottom: "0.5%",
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
  inputBoard: {
    flex: 1,
    position: "absolute",
    height: "81.5%",
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
});
