import { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeContextProvider from "./src/contexts/themeContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeContextProvider>
          <AppNavigator />
        </ThemeContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
