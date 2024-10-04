// CMToast.js
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { ThemeTextColors } from "../theme/theme";
import { useFonts } from "expo-font";
import SuccessIcon from "../Icons/SuccessIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import WarningIcon from "../Icons/WarningIcon";

const CMToast = ({ message, duration = 3000, isVisible, type = "success" }) => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
  });

  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.spring(translateY, {
          toValue: -100,
          useNativeDriver: true,
        }).start();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <SuccessIcon width={24} height={24} />;
      case "error":
        return <ErrorIcon width={24} height={24} />;
      case "warning":
        return <WarningIcon width={24} height={24} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View
      style={[styles.toastContainer, { transform: [{ translateY }] }]}
    >
      {/* Render the correct SVG icon */}
      {renderIcon(type)}
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection:"row",
    gap:10,
    position: "absolute",
    top: 40,
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  toastText: {
    fontFamily: "Jakarta-Sans-bold",
    color: ThemeTextColors.darkGray1,
    fontSize: 14,
  },
});

export default CMToast;
