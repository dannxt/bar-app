import { BaseToast, ErrorToast } from "react-native-toast-message";
import { View, Text, PixelRatio, useWindowDimensions } from "react-native";

const fontScale = PixelRatio.getFontScale();
/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  special: (props: any) => (
    <BaseToast
      {...props}
      style={{
        width: useWindowDimensions().width * 0.25,
        marginLeft: useWindowDimensions().width * 0.06,
        borderLeftWidth: 2,
        borderColor: "#46507a",
        borderLeftColor: "#46507a",
        borderWidth: 2,
        elevation: 50,
      }}
      contentContainerStyle={{
        width: "90%",
        borderRadius: 5,
        backgroundColor: "#afb9e3",
      }}
      text1Style={{
        fontSize: fontScale * 12,
        fontFamily: "UbuntuMono-Bold",
        textAlign: "center",
      }}
    />
  ),

  notFound: (props: any) => (
    <BaseToast
      {...props}
      style={{
        width: useWindowDimensions().width * 0.25,
        marginLeft: useWindowDimensions().width * 0.06,
        borderRadius: 5,
        borderLeftWidth: 0,
      }}
      contentContainerStyle={{
        width: "90%",
        borderRadius: 5,
        backgroundColor: "#ffd4d4",
      }}
      text1Style={{
        fontSize: fontScale * 12,
        fontFamily: "UbuntuMono-Bold",
        textAlign: "center",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  customToast: ({ text1, props }: any) => (
    <View style={{ height: 60, width: "30%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
