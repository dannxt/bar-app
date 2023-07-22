import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/themeContext";
import { TextInput } from "react-native-paper";

export default function InputScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const textStyle = [styles.text, { color: colors[themeT].text }];
  const [input, setInput] = useState("");

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={[styles.container, { backgroundColor: colors[themeT].background }]}
    >
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={(text) => setInput(text)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 0.2,
  },
  text: {
    fontSize: 20,
    marginRight: 20,
  },
});
