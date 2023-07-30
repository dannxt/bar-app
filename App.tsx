import { useState, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeContextProvider from "./src/contexts/ThemeContext";
import DimensionsContextProvider from "./src/contexts/DimensionsContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

SplashScreen.preventAutoHideAsync();
export default function App() {
  //States
  const [dataString, setDataString] = useState("");
  const [fontsLoaded] = useFonts({
    "UbuntuMono-Regular": require("./src/assets/fonts/UbuntuMono-Regular.ttf"),
    "UbuntuMono-Bold": require("./src/assets/fonts/UbuntuMono-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      loadData();
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  function loadData() {
    console.log("Loading data...");
    const data = readFileAsync();
    console.log(data);
  }

  // // File I/O Functions
  const fileUri = FileSystem.bundleDirectory + "src/assets/data/routeData.txt";

  const readFileAsync = async () => {
    try {
      const data = await FileSystem.readAsStringAsync(fileUri);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

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
        <ThemeContextProvider>
          <DimensionsContextProvider>
            <AppNavigator />
          </DimensionsContextProvider>
        </ThemeContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
