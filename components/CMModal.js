import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import CMline from "./CMline";
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

const CMModal = ({ options, modalStyle }) => {
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_500Medium,
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <View style={[styles.modalContent, modalStyle]}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={option.onPress}>
          <Text style={[styles.modalText, option.textStyle]}>
            {option.label}
          </Text>
          {index !== options.length - 1 && <CMline />}
          {/* Only render CMline if not the last item */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CMModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: scaleSize(2),
    borderRadius: scaleSize(10),
    justifyContent: "center",
    paddingRight: scaleSize(20),
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  modalText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(14),
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
