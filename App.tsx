import { useCallback, useState, useContext, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeContextProvider from "./src/contexts/ThemeContext";
import { ThemeContext } from "./src/contexts/ThemeContext";
import DimensionsContextProvider from "./src/contexts/DimensionsContext";
import SearchResultGridContextProvider from "./src/contexts/SearchResultGridContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/Modals/ToastConfigs";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ignore log notification by message
LogBox.ignoreLogs([
  "Require cycle: App.tsx -> src/navigation/AppNavigator.tsx -> src/screens/InputScreen.tsx -> App.tsx",
  "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.",
]);
// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync();

export const routeDataList: string[] = [];

export default function App() {
  const { theme, themeHandler, toggleTheme } = useContext(ThemeContext);
  const [dataLength, setDataLength] = useState(0);
  const [fontsLoaded] = useFonts({
    "UbuntuMono-Regular": require("./src/assets/fonts/UbuntuMono-Regular.ttf"),
    "UbuntuMono-Bold": require("./src/assets/fonts/UbuntuMono-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    const start = performance.now();
    loadData();
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      const end = performance.now();
      console.log(`routeDatas took ${(end - start) / 1000} seconds to run`);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  async function loadData() {
    let len = 0;
    routeDataList.push(require("./src/data/routeData1.tsx"));
    // routeDataList.push(require("./src/data/routeData2.tsx"));
    // routeDataList.push(require("./src/data/routeData3.tsx"));
    // routeDataList.push(require("./src/data/routeData4.tsx"));
    // routeDataList.push(require("./src/data/routeData5.tsx"));
    // routeDataList.push(require("./src/data/routeData6.tsx"));
    // routeDataList.push(require("./src/data/routeData7.tsx"));
    // routeDataList.push(require("./src/data/routeData8.tsx"));
    routeDataList.forEach((routeData, index) => {
      console.log(`routeData${index + 1}: ${routeData.length}`);
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
              <AppNavigator dataLength={dataLength} />
            </NavigationContainer>
          </DimensionsContextProvider>
        </ThemeContextProvider>
      </SearchResultGridContextProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}
