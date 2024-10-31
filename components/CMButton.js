import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
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
const CMButton = ({
  title = "Button", // default title if none is passed
  onPress, // function to handle button press
  style, // custom style for button
  textStyle, // custom style for text
  disabled = false, // disabled state
  icon = null, // icon component (optional)
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default CMButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor:"#FFD7CD",
    borderRadius: scaleSize(8),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: scaleFontSize(16),
    color: "#ffffff",
  },
  iconContainer: {
    marginLeft: scaleSize(6), // space between text and icon
  },
});
