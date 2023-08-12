import { useContext, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import colors from "../themes/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

type searchOptionButtonsProps = {
  searchTypeHandler: (value: string) => void;
  searchType: string;
};

const SearchOptionButtons = ({
  searchTypeHandler,
  searchType,
}: searchOptionButtonsProps) => {
  const { theme, toggleTheme }: any = useContext(ThemeContext);
  const themeT = theme as keyof typeof colors;
  const [value, setValue] = useState("advanced");

  useEffect(() => {
    setValue(searchType);
  }, [searchType]);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={(value) => {
          setValue(value);
          searchTypeHandler(value);
          AsyncStorage.setItem("searchType", value);
        }}
        buttons={[
          {
            value: "basic",
            label: "普搜",
            checkedColor: "black",
            style: {
              backgroundColor:
                value === "basic"
                  ? colors[themeT].textInput
                  : colors[themeT].background,
            },
            uncheckedColor: colors[themeT].text,
          },
          {
            value: "advanced",
            label: "高搜",
            checkedColor: "black",
            style: {
              backgroundColor:
                value === "advanced"
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
