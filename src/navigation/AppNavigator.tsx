import { createBottomTabNavigator } from "@tarikfp/react-native-tabs-sidebar";
import { useState, createContext, useContext, useEffect } from "react";
import { StyleSheet, View, PixelRatio } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import InputScreen from "../screens/InputScreen";
import ResultScreen from "../screens/ResultScreen";
import ThirdScreen from "../screens/ThirdScreen";
import SettingScreen from "../screens/SettingScreen";
import ModalScreen from "../screens/ModalScreen";
import colors from "../themes/colors";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import * as Haptics from "expo-haptics";

type AppNavigatorProps = {
  data: string[];
};

export default function AppNavigator(data: AppNavigatorProps) {
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
  const emptyResultGrid = [
    [
      { key: 1, value: "", match: "no" },
      { key: 2, value: "", match: "no" },
      { key: 3, value: "", match: "no" },
      { key: 4, value: "", match: "no" },
      { key: 5, value: "", match: "no" },
      { key: 6, value: "", match: "no" },
      { key: 7, value: "", match: "no" },
      { key: 8, value: "", match: "no" },
      { key: 9, value: "", match: "no" },
    ],
    [
      { key: 10, value: "", match: "no" },
      { key: 11, value: "", match: "no" },
      { key: 12, value: "", match: "no" },
      { key: 13, value: "", match: "no" },
      { key: 14, value: "", match: "no" },
      { key: 15, value: "", match: "no" },
      { key: 16, value: "", match: "no" },
      { key: 17, value: "", match: "no" },
      { key: 18, value: "", match: "no" },
    ],
    [
      { key: 19, value: "", match: "no" },
      { key: 20, value: "", match: "no" },
      { key: 21, value: "", match: "no" },
      { key: 22, value: "", match: "no" },
      { key: 23, value: "", match: "no" },
      { key: 24, value: "", match: "no" },
      { key: 25, value: "", match: "no" },
      { key: 26, value: "", match: "no" },
      { key: 27, value: "", match: "no" },
    ],
    [
      { key: 28, value: "", match: "no" },
      { key: 29, value: "", match: "no" },
      { key: 30, value: "", match: "no" },
      { key: 31, value: "", match: "no" },
      { key: 32, value: "", match: "no" },
      { key: 33, value: "", match: "no" },
      { key: 34, value: "", match: "no" },
      { key: 35, value: "", match: "no" },
      { key: 36, value: "", match: "no" },
    ],
    [
      { key: 37, value: "", match: "no" },
      { key: 38, value: "", match: "no" },
      { key: 39, value: "", match: "no" },
      { key: 40, value: "", match: "no" },
      { key: 41, value: "", match: "no" },
      { key: 42, value: "", match: "no" },
      { key: 43, value: "", match: "no" },
      { key: 44, value: "", match: "no" },
      { key: 45, value: "", match: "no" },
    ],
    [
      { key: 46, value: "", match: "no" },
      { key: 47, value: "", match: "no" },
      { key: 48, value: "", match: "no" },
      { key: 49, value: "", match: "no" },
      { key: 50, value: "", match: "no" },
      { key: 51, value: "", match: "no" },
      { key: 52, value: "", match: "no" },
      { key: 53, value: "", match: "no" },
      { key: 54, value: "", match: "no" },
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
    useState(emptyResultGrid);
  const [numMatches_9, setNumMatches_9] = useState(28);

  //handlers
  const handleSearch = (searchString: string) => {
    const matchString = findResultString(mainString_A, searchString);
    if (matchString.length > 0) {
      console.log("found match!");
      const resultGrid = convertToNestedResultObjects(
        matchString,
        searchString.length
      );
      setSearchResultsGrid_9(resultGrid);
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
  function findAllOccurrences(mainString: string, searchString: string) {
    const indices = [];
    let index = mainString.indexOf(searchString);

    while (index !== -1 && indices.length < 5) {
      indices.push(index);
      index = mainString.indexOf(searchString, index + 1);
    }
    return indices;
  }

  // Navigation and Component Rendering

  const Stack = createStackNavigator();
  function HomeScreenStackNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Home" component={InputScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="MyModal"
            component={() => (
              <ModalScreen
                searchResultsGrid_9={searchResultsGrid_9}
                numMatches_9={numMatches_9}
              />
            )}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
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
            name="HomeScreenStackNavigator"
            component={HomeScreenStackNavigator}
            initialParams={{
              handleSearch: handleSearch,
            }}
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
          >
            {() => (
              <ResultScreen
                searchResultsGrid_9={searchResultsGrid_9}
                numMatches_9={numMatches_9}
              />
            )}
          </Tab.Screen>
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
