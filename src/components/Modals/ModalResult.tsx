import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import colors from "../../themes/colors";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DimensionsContext } from "../../contexts/DimensionsContext";
import { LinearGradient } from "expo-linear-gradient";
import MiniBoard from "../MiniBoard";
import MiniResultBoard from "../MiniResultBoard";
import { SearchResultGridContext } from "../../contexts/SearchResultGridContext";

type ModalResultProps = {
  isModalVisible: boolean;
  toggleModal: () => void;
};

export default function ModalResult({
  isModalVisible,
  toggleModal,
}: ModalResultProps) {
  //context
  const { deviceHeight, deviceWidth } = useContext(DimensionsContext);
  const { theme }: any = useContext(ThemeContext);
  const { searchResultsGrid9, searchResultsGrid3, searchResultsGrid4 } =
    useContext(SearchResultGridContext);
  const themeT = theme as keyof typeof colors;
  const textColor = { color: colors[themeT].text };

  return (
    <LinearGradient
      colors={["black", "transparent"]}
      start={[0, 0]}
      end={[1, 0]}
      locations={[0, 0.005]}
      style={{
        flex: 1,
        backgroundColor: colors[themeT].background,
        position: "absolute",
      }}
    >
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropTransitionOutTiming={0}
        statusBarTranslucent={true}
        backdropOpacity={0.8}
        style={[styles.modal, { backgroundColor: colors[themeT].background }]}
      >
        <View style={styles.boardCont}>
          <View style={styles.boardInnerCont}>
            <Text
              style={[
                textColor,
                styles.roadTitle,
                {
                  fontSize: 0.02 * deviceWidth,
                },
              ]}
            >
              Type 3
            </Text>
            <MiniResultBoard
              style={styles.miniResultBoard}
              inputGrid={searchResultsGrid9}
              numColumns={8}
            />
            <MiniBoard style={styles.miniBoard} />
          </View>
          <View style={styles.boardInnerCont}>
            <Text
              style={[
                textColor,
                styles.roadTitle,
                {
                  fontSize: 0.02 * deviceWidth,
                },
              ]}
            >
              Type 3
            </Text>
            <MiniResultBoard
              style={styles.miniResultBoard}
              inputGrid={searchResultsGrid3}
              numColumns={8}
            />
            <MiniBoard style={styles.miniBoard} />
          </View>
          <View style={styles.boardInnerCont}>
            <Text
              style={[
                textColor,
                styles.roadTitle,
                {
                  fontSize: 0.02 * deviceWidth,
                },
              ]}
            >
              Type 3
            </Text>
            <MiniResultBoard
              style={styles.miniResultBoard}
              inputGrid={searchResultsGrid4}
              numColumns={8}
            />
            <MiniBoard style={styles.miniBoard} />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  boardCont: {
    flex: 1,
    flexDirection: "row",
  },
  modal: {
    flex: 1,
    alignSelf: "center",
    width: "73%",
    height: "100%",
    borderRadius: 20,
    marginLeft: "11.5%",
  },
  boardInnerCont: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  miniResultBoard: {
    position: "absolute",
    top: "24.5%",
    height: "72%",
    width: "91%",
  },
  miniBoard: {
    position: "absolute",
    top: "23%",
    contentFit: "contain",
    height: "72%",
    width: "91%",
  },
  roadTitle: {
    marginVertical: "15.05%",
    fontFamily: "UbuntuMono-Bold",
  },
});
