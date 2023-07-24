import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const SearchOptionButtons = () => {
  const [value, setValue] = React.useState("nineData");

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "nineData",
            label: "9路",
          },
          {
            value: "threeData",
            label: "3路",
          },
          {
            value: "fourData",
            label: "4路",
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
  },
});

export default SearchOptionButtons;
