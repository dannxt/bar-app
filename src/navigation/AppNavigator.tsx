import { createBottomTabNavigator } from "@tarikfp/react-native-tabs-sidebar";
import { useState, useContext, useEffect } from "react";
import { StyleSheet, View, useWindowDimensions, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import InputScreen from "../screens/InputScreen";
import ResultScreen from "../screens/ResultScreen";
import ThirdScreen from "../screens/ThirdScreen";
import SettingScreen from "../screens/SettingScreen";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/themeContext";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";

export default function AppNavigator() {
  const { width } = useWindowDimensions();
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
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
              width: width * 0.08,
            },
          })}
        >
          <Tab.Screen
            listeners={() => ({
              tabPress: () => {
                triggerHaptic();
              },
            })}
            name="InputScreen"
            component={InputScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "film" : "film-outline"}
                  size={width * 0.03}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            listeners={() => ({
              tabPress: () => {
                triggerHaptic();
              },
            })}
            name="ResultScreen"
            component={ResultScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "keypad" : "keypad-outline"}
                  size={width * 0.03}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            listeners={() => ({
              tabPress: () => {
                triggerHaptic();
              },
            })}
            name="ThirdScreen"
            component={ThirdScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "ios-cube" : "ios-cube-outline"}
                  size={width * 0.03}
                  color={focused ? "white" : "grey"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            listeners={() => ({
              tabPress: () => {
                triggerHaptic();
              },
            })}
            name="SettingScreen"
            component={SettingScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "cog" : "cog-outline"}
                  size={width * 0.03}
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
  },
  pressed: {
    opacity: 0.75,
  },
});
