import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { ThemeTextColors } from "../theme/theme";
import {
  useFonts,
  PlusJakartaSans_500Medium,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Dimensions, PixelRatio } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / 430; // iPhone 14 Plus width as the base
  return PixelRatio.roundToNearestPixel(size * scale);
};
// Adjusts dimensions based on iPhone 14 Plus width
const scaleSize = (size) => {
  const scale = SCREEN_WIDTH / 430;
  return PixelRatio.roundToNearestPixel(size * scale);
};

const CMCheckbox = ({
  value,
  checkoxStyle,
  lable,
  onValueChange,
  lableStyle,
}) => {
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_500Medium,
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        style={[styles.checkbox, checkoxStyle]}
        color={value ? ThemeTextColors.darkOrange : undefined}
      />
      <Text style={[styles.checkboxlabel, lableStyle]}>{lable}</Text>
    </View>
  );
};

export default CMCheckbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: scaleSize(5),
  },
  checkbox: {
    alignSelf: "center",
    width: scaleSize(13),
    height: scaleSize(13),
    borderColor: ThemeTextColors.orange,
  },
  checkboxlabel: {
    paddingHorizontal: scaleSize(8),
    paddingBottom: scaleSize(4),
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(17),
    color: ThemeTextColors.darkGray1,
    justifyContent: "center",
    alignItems: "center",
  },
});
