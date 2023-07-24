import { useState, createContext, useContext } from "react";
import { useWindowDimensions, StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeContextProvider from "./src/contexts/ThemeContext";
import DimensionsContextProvider from "./src/contexts/DimensionsContext";

export default function App() {
  return (
    <SafeAreaProvider>
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
