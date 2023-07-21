import { useState, useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@tarikfp/react-native-tabs-sidebar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import InputScreen from "../screens/InputScreen";
import ResultScreen from "../screens/ResultScreen";
import ThirdScreen from "../screens/ThirdScreen";
import SettingScreen from "../screens/SettingScreen";
import colors from "../themes/colors";
import darkTheme from "../themes/darkTheme";
import lightTheme from "../themes/lightTheme";
import { ThemeContext } from "../contexts/themeContext";

export default function AppNavigator() {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;

  return (
    <View
      style={[
        styles.outerCont,
        {
          paddingLeft: insets.left,
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
            },
          })}
        >
          <Tab.Screen
            name="InputScreen"
            component={InputScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "film" : "film-outline"}
                  size={26}
                  color={focused ? "white" : "grey"}
                  onPressIn={() => console.log("InputScreen")}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "keypad" : "keypad-outline"}
                  size={26}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="ThirdScreen"
            component={ThirdScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "ios-cube" : "ios-cube-outline"}
                  size={26}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "cog" : "cog-outline"}
                  size={26}
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
  },
  innerCont: {
    flex: 1,
    borderRadius: 200,
    borderColor: "yellow",
  },
});
