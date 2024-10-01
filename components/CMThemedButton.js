import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const CMThemedButton = ({
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
      <LinearGradient
        colors={disabled ? ["#999", "#aaa"] : ["#F87655", "#EF5128"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CMThemedButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  iconContainer: {
    marginLeft: 6, // space between text and icon
  },
});
