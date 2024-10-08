import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { useFonts } from "expo-font";
import CMLoader from "./CMLoader";
import DownArrowIcon from "../Icons/DownArrowIcon";

const CMDocsCard = () => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Sans-Semi-bold-Italic": require("../assets/fonts/static/PlusJakartaSans-SemiBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.mainHeadingText}>How do I get points?</Text>
      </View>

      <View style={{ gap: 20 }}>
        <View style={styles.closedCardContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <Text style={styles.title}>
              New product approval at a hospital or facility
            </Text>
            <TouchableOpacity onPress={() => console.log("hello")}>
              <DownArrowIcon color="white" width={20} height={15} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.closedCardContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <Text style={styles.title}>New doctor using Isto product</Text>
            <TouchableOpacity onPress={() => console.log("hello")}>
              <DownArrowIcon color="white" width={20} height={15} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Jakarta-Sans-Semi-bold-Italic",
              fontSize: 19,
              color: ThemeTextColors.darkGray1,
            }}
          >
            *New doctors and/or new product approvals do not count until the
            first case has taken place. Case information is required for
            submission
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CMDocsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: 20,
    width: "100%",
    height: "auto",
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  mainHeadingText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 21,
    marginBottom: 20,
    color: ThemeTextColors.orange,
  },
  closedCardContainer: {
    backgroundColor: ThemeTextColors.darkGray1,
    borderRadius: 14,
    paddingVertical: 20,
  },
  title: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 18,
    color: ThemeTextColors.white,
    maxWidth: 220,
  },
});
