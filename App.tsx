import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeContextProvider from "./src/contexts/ThemeContext";
import DimensionsContextProvider from "./src/contexts/DimensionsContext";
import SearchResultGridContextProvider from "./src/contexts/SearchResultGridContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync();

export const routeDataList: string[] = [];

export default function App() {
  //States
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
      console.log("finished loading!");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  async function loadData() {
    routeDataList.push(require("./src/data/routeData0.tsx"));
    // routeDataList.push(require("./src/data/routeData2.tsx"));
    // routeDataList.push(require("./src/data/routeData3.tsx"));
    // routeDataList.push(require("./src/data/routeData4.tsx"));
    // routeDataList.push(require("./src/data/routeData5.tsx"));
    // routeDataList.push(require("./src/data/routeData6.tsx"));
    // routeDataList.push(require("./src/data/routeData7.tsx"));
    // routeDataList.push(require("./src/data/routeData8.tsx"));
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
      <Toast />
    </SafeAreaProvider>
  );
}
