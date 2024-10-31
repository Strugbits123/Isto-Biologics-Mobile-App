import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { HelperText } from "react-native-paper";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
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

const CMInput = ({
  title,
  titleStyle,
  value,
  inputStyle,
  onChange,
  placeholderText,
  error,
  errorMessage,
  editable = true,
}) => {
  let [fontsLoaded, errorFonts] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded && !errorFonts) {
    return null;
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputTitle, titleStyle]}>{title}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={ThemeTextColors.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={value ? value : placeholderText}
        editable={editable}
      />
      {error && (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export default CMInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: scaleSize(10),
  },
  input: {
    fontFamily: "PlusJakartaSans_400Regular",
    minWidth: "100%",
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(8),
    borderColor: "#E8ECF4",
    borderWidth: scaleSize(1),
    fontSize: scaleFontSize(14),
    borderRadius: scaleSize(8),
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
  },
  inputTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.darkGray1,
    marginBottom: scaleSize(10),
  },
});
