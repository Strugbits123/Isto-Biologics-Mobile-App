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
