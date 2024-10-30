import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import CMline from "./CMline";
import { PlusJakartaSans_500Medium } from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const CMModal = ({ options, modalStyle }) => {
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_500Medium,
  });

  // useEffect(() => {
  //   if (fontsLoaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, error]);

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
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
