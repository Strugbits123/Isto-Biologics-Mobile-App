import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CMLoader from "./CMLoader";
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
const CMThemedButton = ({
  title = "Button", // default title if none is passed
  onPress, // function to handle button press
  style, // custom style for button
  gradientStyle,
  loading,
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
      <LinearGradient
        colors={disabled ? ["#999", "#aaa"] : ["#F87655", "#EF5128"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, gradientStyle]}
      >
        <View style={styles.content}>
          {loading ? (
            <CMLoader size={scaleSize(22)} color="#ffffff" />
          ) : (
            <View style={styles.content}>
              <Text style={[styles.buttonText, textStyle]}>{title}</Text>
              {icon && <View style={styles.iconContainer}>{icon}</View>}
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CMThemedButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: scaleSize(8),
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: scaleSize(15),
    paddingHorizontal: scaleSize(20),
    borderRadius: scaleSize(8),
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: scaleFontSize(16),
    color: "#ffffff",
    fontWeight: "bold",
  },
  iconContainer: {
    marginLeft: scaleSize(6), // space between text and icon
  },
});
