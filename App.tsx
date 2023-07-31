import { useState, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeContextProvider from "./src/contexts/ThemeContext";
import DimensionsContextProvider from "./src/contexts/DimensionsContext";
import SearchResultGridContextProvider from "./src/contexts/SearchResultGridContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync();

export default function App() {
  //variables
  const routeDataList: string[] = [];
  //States
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
    routeDataList.push(require("./src/data/routeData1.tsx"));
    routeDataList.push(require("./src/data/routeData2.tsx"));
    // const item2 = require("./src/data/routeData2.tsx");
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

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <SearchResultGridContextProvider>
          <ThemeContextProvider>
            <DimensionsContextProvider>
              <AppNavigator data={routeDataList} />
            </DimensionsContextProvider>
          </ThemeContextProvider>
        </SearchResultGridContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
