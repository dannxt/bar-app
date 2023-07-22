import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

type TabBarButtonProps = {
  children: React.ReactNode;
};

const TabBarButton = ({ children }: TabBarButtonProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.touchable}>
      <TouchableRipple
        onPressOut={() => {
          styles.touchable.opacity = 0.5;
        }}
        rippleColor="white"
        underlayColor="red"
      >
        {children}
      </TouchableRipple>
    </View>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  touchable: {
    height: 50,
    width: 50,
    alignItems: "center",
    opacity: 0.5,
  },
});
