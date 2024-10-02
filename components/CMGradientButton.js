import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeBgColors } from "../theme/theme";

const CMGradientButton = ({
  title = "Button", // default title if none is passed
  onPress, // function to handle button press
  style, // custom style for button
  textStyle, // custom style for text
  disabled = false, // disabled state
  gradientColors = ["#F87655", "#EF5128"],
}) => {
  return (
    <LinearGradient colors={gradientColors} style={[styles.button, style]}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CMGradientButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFD7CD",
    borderRadius: 8,
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
  },
});
