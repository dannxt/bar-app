import { createBottomTabNavigator } from "@tarikfp/react-native-tabs-sidebar";
import { useState, createContext, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  PixelRatio,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import InputScreen from "../screens/InputScreen";
import ResultScreen from "../screens/ResultScreen";
import ThirdScreen from "../screens/ThirdScreen";
import SettingScreen from "../screens/SettingScreen";
import colors from "../themes/colors";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import * as Haptics from "expo-haptics";

export default function AppNavigator() {
  //variables
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const themeT = theme as keyof typeof colors;
  const fontScale = PixelRatio.getFontScale();
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  //Data
  const mainString_A =
    "BPBPBPBPBPBPBPBPBPBBBBBBBBBBBBBBBBBBBBBBBBBBBBPPPPPPPPPPPPPPPPPP";

  //States
  const emptyGrid = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
  ];
  const sampleResultGrid = [
    [
      { key: 1, value: "P", match: "yes" },
      { key: 2, value: "B", match: "yes" },
      { key: 3, value: "P", match: "yes" },
      { key: 4, value: "B", match: "yes" },
      { key: 5, value: "B", match: "yes" },
      { key: 6, value: "P", match: "yes" },
      { key: 7, value: "P", match: "yes" },
      { key: 8, value: "B", match: "yes" },
      { key: 9, value: "B", match: "yes" },
    ],
    [
      { key: 10, value: "B", match: "yes" },
      { key: 11, value: "B", match: "yes" },
      { key: 12, value: "B", match: "yes" },
      { key: 13, value: "B", match: "yes" },
      { key: 14, value: "B", match: "yes" },
      { key: 15, value: "P", match: "yes" },
      { key: 16, value: "B", match: "yes" },
      { key: 17, value: "P", match: "yes" },
      { key: 18, value: "B", match: "yes" },
    ],
    [
      { key: 19, value: "P", match: "yes" },
      { key: 20, value: "B", match: "yes" },
      { key: 21, value: "P", match: "yes" },
      { key: 22, value: "B", match: "yes" },
      { key: 23, value: "P", match: "yes" },
      { key: 24, value: "B", match: "yes" },
      { key: 25, value: "P", match: "yes" },
      { key: 26, value: "B", match: "yes" },
      { key: 27, value: "P", match: "yes" },
    ],
    [
      { key: 28, value: "B", match: "yes" },
      { key: 29, value: "P", match: "no" },
      { key: 30, value: "B", match: "no" },
      { key: 31, value: "P", match: "no" },
      { key: 32, value: "B", match: "no" },
      { key: 33, value: "P", match: "no" },
      { key: 34, value: "B", match: "no" },
      { key: 35, value: "P", match: "no" },
      { key: 36, value: "B", match: "no" },
    ],
    [
      { key: 37, value: "P", match: "no" },
      { key: 38, value: "B", match: "no" },
      { key: 39, value: "P", match: "no" },
      { key: 40, value: "B", match: "no" },
      { key: 41, value: "P", match: "no" },
      { key: 42, value: "B", match: "no" },
      { key: 43, value: "B", match: "no" },
      { key: 44, value: "B", match: "no" },
      { key: 45, value: "B", match: "no" },
    ],
    [
      { key: 46, value: "B", match: "no" },
      { key: 47, value: "B", match: "no" },
      { key: 48, value: "B", match: "no" },
      { key: 49, value: "P", match: "no" },
      { key: 50, value: "B", match: "no" },
      { key: 51, value: "P", match: "no" },
      { key: 52, value: "P", match: "no" },
      { key: 53, value: "P", match: "no" },
      { key: 54, value: "B", match: "no" },
    ],
    [
      { key: 55, value: "", match: "no" },
      { key: 56, value: "", match: "no" },
      { key: 57, value: "", match: "no" },
      { key: 58, value: "", match: "no" },
      { key: 59, value: "", match: "no" },
      { key: 60, value: "", match: "no" },
      { key: 61, value: "", match: "no" },
      { key: 62, value: "", match: "no" },
      { key: 63, value: "", match: "no" },
    ],
    [
      { key: 64, value: "", match: "no" },
      { key: 65, value: "", match: "no" },
      { key: 66, value: "", match: "no" },
      { key: 67, value: "", match: "no" },
      { key: 68, value: "", match: "no" },
      { key: 69, value: "", match: "no" },
      { key: 70, value: "", match: "no" },
      { key: 71, value: "", match: "no" },
      { key: 72, value: "", match: "no" },
    ],
  ];

  const [searchResultsGrid_9, setSearchResultsGrid_9] =
    useState(sampleResultGrid);
  const [numMatches_9, setNumMatches_9] = useState(28);
  const [isThereResult, setIsThereResult] = useState(false);

  //handlers
  const handleSearch = (searchString: string) => {
    const result = findResultString(mainString_A, searchString);
    if (result.length > 0) {
      console.log("found match!");
      const resultGrid = convertToNestedLists(result);
      setSearchResultsGrid_9(resultGrid);
      setIsThereResult(true);
    } else {
      console.log("no match!");
    }
  };

  //functions
  function findResultString(mainString: string, searchString: string) {
    const index = mainString.indexOf(searchString);
    if (index === -1) {
      return "";
    }
    const maxLength = mainString.length - index;
    const desiredLength = Math.min(searchString.length + 18, maxLength);
    return mainString.slice(index, index + desiredLength);
  }
  function convertToNestedLists(inputString: string) {
    const nestedLists = [];
    for (let i = 0; i < inputString.length; i += 9) {
      const sublist = inputString.slice(i, i + 9).split("");
      nestedLists.push(sublist);
    }
    return nestedLists;
  }
  function findAllOccurrences(mainString: string, searchString: string) {
    const indices = [];
    let index = mainString.indexOf(searchString);

    while (index !== -1 && indices.length < 5) {
      indices.push(index);
      index = mainString.indexOf(searchString, index + 1);
    }
    return indices;
  }

  return (
    <View
      style={[
        styles.outerCont,
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.innerCont}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarPosition: "left",
            tabBarLabel: () => null,
            tabBarStyle: {
              backgroundColor: colors[themeT].tabBar,
              width: deviceWidth * 0.07,
            },
          })}
        >
          <Tab.Screen
            listeners={() => ({
              tabPress: () => {
                triggerHaptic();
              },
            })}
            name="InputScreen"
            component={InputScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "film" : "film-outline"}
                  size={deviceWidth * 0.03}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            listeners={() => ({
              tabPress: () => {
                triggerHaptic();
              },
            })}
            name="ResultScreen"
            component={ResultScreen}
            initialParams={{
              searchResultsGrid_9: searchResultsGrid_9,
              numMatches_9: numMatches_9,
            }}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "keypad" : "keypad-outline"}
                  size={deviceWidth * 0.03}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            listeners={() => ({
              tabPress: () => {
                triggerHaptic();
              },
            })}
            name="ThirdScreen"
            component={ThirdScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "ios-cube" : "ios-cube-outline"}
                  size={deviceWidth * 0.03}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            listeners={() => ({
              tabPress: () => {
                triggerHaptic();
              },
            })}
            name="SettingScreen"
            component={SettingScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "cog" : "cog-outline"}
                  size={deviceWidth * 0.03}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    backgroundColor: "black",
    elevation: 25,
  },
  innerCont: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
