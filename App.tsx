import { useState, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeContextProvider from "./src/contexts/ThemeContext";
import DimensionsContextProvider from "./src/contexts/DimensionsContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";

// Ignore log notification by message:
if (__DEV__) {
  const ignoreWarns = [
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}
// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync();

const RootStack = createStackNavigator();

export default function App() {
  //variables
  const routeDataList: string[] = [];
  //States
  const [dataString, setDataString] = useState("");
  const [fontsLoaded] = useFonts({
    "UbuntuMono-Regular": require("./src/assets/fonts/UbuntuMono-Regular.ttf"),
    "UbuntuMono-Bold": require("./src/assets/fonts/UbuntuMono-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      const start = performance.now();
      loadData();
      const end = performance.now();
      console.log(`routeDatas took ${(end - start) / 1000} seconds to run`);
      await SplashScreen.hideAsync();
      console.log("finished loading!");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  async function loadData() {
    // routeDataList.push(require("./src/data/routeData1.tsx"));
    // const item2 = require("./src/data/routeData2.tsx");
  }

  // Data Generation
  function generateDataString(roadNumber: number, len: number) {
    // Step 1: Initialize an empty string to store the result
    let resultString = "";
    const maxNumber = 2 ** roadNumber;
    const iterations = Math.ceil(len / roadNumber);

    // Step 2: Loop until the result string's length is at least 'len'
    for (let i = 0; i < iterations; i++) {
      // Step 3: Pick a random number between 0 and (2^a - 1)
      const randomNumber = Math.floor(Math.random() * maxNumber);
      // Step 4: Convert the number to binary form
      const binaryString = randomNumber.toString(2);
      // Step 5: Convert binary form to the string pattern "B" and "P"
      const binaryPattern = binaryString
        .split("")
        .map((digit) => (digit === "1" ? "B" : "P"))
        .join("");
      // Step 6: Concatenate the current binary pattern to the result string
      resultString += binaryPattern;
    }
    return resultString;
  }

  function StackNavigator() {
    return (
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="MyModal" component={ModalScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    );
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <ThemeContextProvider>
          <DimensionsContextProvider>
            <AppNavigator data={routeDataList} />
          </DimensionsContextProvider>
        </ThemeContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
