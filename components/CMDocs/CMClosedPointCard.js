import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import DownArrowIcon from "../../Icons/DownArrowIcon";
import { ThemeTextColors } from "../../theme/theme";
import {
  useFonts,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

const CMClosedPointCard = ({ onPress, listNumber, title }) => {
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <View style={styles.closedCardContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingRight: 30,
        }}
      >
        <View style={styles.TextContainer}>
          <Text style={styles.orderListNumber}>{listNumber}.</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <DownArrowIcon color="white" width={20} height={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CMClosedPointCard;

const styles = StyleSheet.create({
  closedCardContainer: {
    backgroundColor: ThemeTextColors.darkGray1,
    borderRadius: 14,
    paddingVertical: 20,
  },
  TextContainer: { flexDirection: "row", gap: 5 },
  orderListNumber: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    color: ThemeTextColors.white,
  },
  openOrderListNumber: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    color: ThemeTextColors.darkGray1,
  },
  title: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    color: ThemeTextColors.white,
    maxWidth: 220,
    flexShrink: 1,
  },
});
