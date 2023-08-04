import { createBottomTabNavigator } from "@tarikfp/react-native-tabs-sidebar";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ResultScreen from "../screens/ResultScreen";
import ThirdScreen from "../screens/ThirdScreen";
import SettingScreen from "../screens/SettingScreen";
import colors from "../themes/colors";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import * as Haptics from "expo-haptics";
import InputScreen from "../screens/InputScreen";

type AppNavigatorProps = {
  dataLength: number;
};

export default function AppNavigator(props: AppNavigatorProps) {
  //variables
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { theme }: any = useContext(ThemeContext);
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const themeT = theme as keyof typeof colors;
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Navigation and Component Rendering
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
            name="ResultScreen"
            component={ResultScreen}
            options={{
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
            name="ThirdScreen"
            component={ThirdScreen}
            initialParams={{ dataLength: props.dataLength }}
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
