import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

const CMOpenedPointCard = ({ onPress, listNumber, title, points = [] }) => {
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <View style={styles.openedCardContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingRight:30
        }}
      >
        <View style={styles.TextContainer}>
          <Text style={styles.openOrderListNumber}>{listNumber}.</Text>
          <Text style={styles.openedCardtitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <UpArrowIcon width={20} height={15} />
        </TouchableOpacity>
      </View>
      {/* points list dynamic showing  */}
      <View style={styles.listContainer}>
        {points.map((point, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listText}>{point}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CMOpenedPointCard;

const styles = StyleSheet.create({
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
  },
  openedCardContainer: {
    backgroundColor: ThemeBgColors.docsBg,
    borderRadius: 14,
    paddingVertical: 20,
  },
  openedCardtitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    color: ThemeTextColors.darkGray1,
    maxWidth: 220,
    flexShrink:1
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  bulletPoint: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 16,
    color: ThemeTextColors.extraLightGray,
    marginRight: 5,
  },
  listText: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 16,
    color: ThemeTextColors.extraLightGray,
  },
});
