import * as React from "react";
import { IconButton } from "react-native-paper";

const TabBarButton = () => (
  <IconButton icon="camera" size={20} onPress={() => console.log("Pressed")} />
);

export default TabBarButton;
