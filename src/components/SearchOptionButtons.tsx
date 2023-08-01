import { useContext, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/ThemeContext";

const SearchOptionButtons = () => {
  const { theme, toggleTheme }: any = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const [value, setValue] = useState("nineData");

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        theme={{ colors: { primary: "green" } }}
        buttons={[
          {
            value: "threeData",
            label: "3路",
            checkedColor: colors[themeT].banker,
            style: {
              backgroundColor:
                value === "threeData"
                  ? colors[themeT].textInput
                  : colors[themeT].background,
            },
            uncheckedColor: colors[themeT].text,
          },
          {
            value: "nineData",
            label: "9路",
            checkedColor: colors[themeT].banker,
            style: {
              backgroundColor:
                value === "nineData"
                  ? colors[themeT].textInput
                  : colors[themeT].background,
            },
            uncheckedColor: colors[themeT].text,
          },
          {
            value: "fourData",
            label: "4路",
            checkedColor: colors[themeT].banker,
            style: {
              backgroundColor:
                value === "fourData"
                  ? colors[themeT].textInput
                  : colors[themeT].background,
            },
            uncheckedColor: colors[themeT].text,
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
  },
});

export default SearchOptionButtons;
