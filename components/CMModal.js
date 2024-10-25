import { useFonts } from "expo-font";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import CMLoader from "./CMLoader";
import CMline from "./CMline";
const CMModal = ({ options, modalStyle }) => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }
  return (
    <View style={[styles.modalContent, modalStyle]}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={option.onPress}>
          <Text style={[styles.modalText, option.textStyle]}>
            {option.label}
          </Text>
          <CMline />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CMModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 2,
    borderRadius: 10,
    justifyContent: "center",
    paddingRight: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  modalText: {
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
