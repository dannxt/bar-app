import { createBottomTabNavigator } from "@tarikfp/react-native-tabs-sidebar";
import { useState, createContext, useContext, useEffect } from "react";
import { StyleSheet, View, useWindowDimensions, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import InputScreen from "../screens/InputScreen";
import ResultScreen from "../screens/ResultScreen";
import ThirdScreen from "../screens/ThirdScreen";
import SettingScreen from "../screens/SettingScreen";
import colors from "../themes/colors";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import * as Haptics from "expo-haptics";
import TabBarButton from "../components/TabBarButton";
import { BlurView } from "expo-blur";

export default function AppNavigator() {
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const themeT = theme as keyof typeof colors;
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  //States
  const [isThereResult, setIsThereResult] = useState(false);
  const [isResultTabPressed, setIsResultTabPressed] = useState(false);

  //useEffects
  useEffect(() => {
    if (isThereResult) {
      setIsResultTabPressed(false);
    }
  }, [isThereResult]);
  return (
    <View
      style={[
        styles.outerCont,
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
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
              width: deviceWidth * 0.07,
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
                  size={deviceWidth * 0.03}
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
                setIsResultTabPressed(true);
                setIsResultTabPressed(false);
                setIsThereResult(false);
              },
            })}
            name="ResultScreen"
            component={ResultScreen}
            options={{
              tabBarBadge: "!",
              tabBarBadgeStyle: {
                backgroundColor: "red",
                opacity: isThereResult && !isResultTabPressed ? 1 : 0,
              },
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "keypad" : "keypad-outline"}
                  size={deviceWidth * 0.03}
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
                  size={deviceWidth * 0.03}
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
                  size={deviceWidth * 0.03}
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
    elevation: 25,
  },
  innerCont: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
