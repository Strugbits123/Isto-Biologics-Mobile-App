import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeBgColors } from "../theme/theme";

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
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
  },
  iconContainer: {
    marginLeft: 6, // space between text and icon
  },
});
