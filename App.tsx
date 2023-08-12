import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import { useCallback, useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeContextProvider from "./src/contexts/ThemeContext";
import DimensionsContextProvider from "./src/contexts/DimensionsContext";
import SearchResultGridContextProvider from "./src/contexts/SearchResultGridContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/Modals/ToastConfigs";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";

// Ignore log notification by message
LogBox.ignoreLogs([
  "Require cycle: App.tsx -> src/navigation/AppNavigator.tsx -> src/screens/InputScreen.tsx -> App.tsx",
  "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.",
]);
// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync();
export const routeDataList9: string[] = [];
export const routeDataList3: string[] = [];
export const routeDataList4: string[] = [];

export default function App() {
  const [fontsLoaded] = useFonts({
    "UbuntuMono-Regular": require("./src/assets/fonts/UbuntuMono-Regular.ttf"),
    "UbuntuMono-Bold": require("./src/assets/fonts/UbuntuMono-Bold.ttf"),
    "UbuntuMono-Italic": require("./src/assets/fonts/UbuntuMono-Italic.ttf"),
  });
  const [dataLength, setDataLength] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    try {
      await loadData();
      setDataLoaded(true);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (dataLoaded && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [dataLoaded, fontsLoaded]);

  async function loadData() {
    console.log("loading initial data...");
    let len = 0;
    routeDataList9.push(require("./len-22-3x3-data/routeData3a-1.js"));
    routeDataList9.push(require("./len-22-3x3-data/routeData3a-2.js"));
    routeDataList9.push(require("./len-22-3x3-data/routeData3a-3.js"));
    routeDataList9.push(require("./len-22-3x3-data/routeData3a-4.js"));
    routeDataList3.push(require("./len-22-3x3-data/routeData3b-1.js"));
    routeDataList3.push(require("./len-22-3x3-data/routeData3b-2.js"));
    routeDataList3.push(require("./len-22-3x3-data/routeData3b-3.js"));
    routeDataList3.push(require("./len-22-3x3-data/routeData3b-4.js"));
    routeDataList4.push(require("./len-22-3x3-data/routeData3c-1.js"));
    routeDataList4.push(require("./len-22-3x3-data/routeData3c-2.js"));
    routeDataList4.push(require("./len-22-3x3-data/routeData3c-3.js"));
    routeDataList4.push(require("./len-22-3x3-data/routeData3c-4.js"));

    routeDataList9.forEach((routeData, index) => {
      len += routeData.length;
    });
    routeDataList3.forEach((routeData, index) => {
      len += routeData.length;
    });
    routeDataList4.forEach((routeData, index) => {
      len += routeData.length;
    });
    setDataLength(len);
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <SearchResultGridContextProvider>
        <ThemeContextProvider>
          <DimensionsContextProvider>
            <NavigationContainer>
              <StatusBar hidden={true} />
              <AppNavigator dataLength={dataLength} />
            </NavigationContainer>

            <Toast config={toastConfig} />
          </DimensionsContextProvider>
        </ThemeContextProvider>
      </SearchResultGridContextProvider>
    </SafeAreaProvider>
  );
}
