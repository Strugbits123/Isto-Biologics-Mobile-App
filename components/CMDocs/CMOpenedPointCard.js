import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import CMLoader from "../CMLoader";
import { useFonts } from "expo-font";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";

const CMOpenedPointCard = ({ onPress, listNumber, title, points=[] }) => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-Semi-bold": require("../../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }
  return (
    <View style={styles.openedCardContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
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
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 18,
    color: ThemeTextColors.white,
  },
  openOrderListNumber: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 18,
    color: ThemeTextColors.darkGray1,
  },
  title: {
    fontFamily: "Jakarta-Sans-Semi-bold",
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
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 18,
    color: ThemeTextColors.darkGray1,
    maxWidth: 220,
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
    fontFamily: "Jakarta-Sans",
    fontSize: 16,
    color: ThemeTextColors.extraLightGray,
    marginRight: 5,
  },
  listText: {
    fontFamily: "Jakarta-Sans",
    fontSize: 16,
    color: ThemeTextColors.extraLightGray,
  },
});
