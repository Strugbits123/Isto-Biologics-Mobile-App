import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
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
const CMGradientButton = ({
  title = "Button", // default title if none is passed
  onPress, // function to handle button press
  style, // custom style for button
  textStyle, // custom style for text
  disabled = false, // disabled state
  gradientColors = ["#F87655", "#EF5128"],
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled={disabled}>
      <LinearGradient colors={gradientColors} style={[styles.button, style]}>
        <View style={styles.content}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CMGradientButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFD7CD",
    borderRadius: scaleSize(8),
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: scaleFontSize(16),
    color: "#ffffff",
  },
});
