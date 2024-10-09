import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import DownArrowIcon from "../../Icons/DownArrowIcon";
import CMLoader from "../CMLoader";
import { useFonts } from "expo-font";
import { ThemeTextColors } from "../../theme/theme";

const CMClosedPointCard = ({ onPress, listNumber, title }) => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }
  return (
    <View style={styles.closedCardContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
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
});
