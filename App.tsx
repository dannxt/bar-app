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
export const routeDataList_3a: string[] = [];
export const routeDataList_3b: string[] = [];
export const routeDataList_3c: string[] = [];

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
    routeDataList_3a.push(require("./len-22-999-data/routeData9-1.js"));
    routeDataList_3a.push(require("./len-22-999-data/routeData9-2.js"));
    routeDataList_3a.push(require("./len-22-999-data/routeData9-3.js"));
    routeDataList_3a.push(require("./len-22-999-data/routeData9-4.js"));
    routeDataList_3b.push(require("./len-22-999-data/routeData9-5.js"));
    routeDataList_3b.push(require("./len-22-999-data/routeData9-6.js"));
    routeDataList_3b.push(require("./len-22-999-data/routeData9-7.js"));
    routeDataList_3b.push(require("./len-22-999-data/routeData9-8.js"));
    routeDataList_3c.push(require("./len-22-999-data/routeData9-9.js"));
    routeDataList_3c.push(require("./len-22-999-data/routeData9-10.js"));
    routeDataList_3c.push(require("./len-22-999-data/routeData9-11.js"));
    routeDataList_3c.push(require("./len-22-999-data/routeData9-12.js"));

    routeDataList_3a.forEach((routeData, index) => {
      len += routeData.length;
    });
    routeDataList_3b.forEach((routeData, index) => {
      len += routeData.length;
    });
    routeDataList_3c.forEach((routeData, index) => {
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
