import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import React from "react";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
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
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: scaleSize(15),
        }}
      >
        <View style={styles.TextContainer}>
          <Text style={styles.openOrderListNumber}>{listNumber}.</Text>
          <Text style={styles.openedCardtitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <UpArrowIcon width={scaleSize(20)} height={scaleSize(15)} />
        </TouchableOpacity>
      </Pressable>
      {/* points list dynamic showing  */}
      <View style={styles.listContainer}>
        {points.map((point, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listText}>
              {/* Check for the specific sentence to apply italic styling */}
              {point.includes("Dr. Smith has been a consistent Magellan user")
                ? point.split("e.g., ").map((chunk, idx) =>
                    idx === 1 ? (
                      <Text key={idx}>
                        e.g.,{" "}
                        <Text style={styles.italicText}>
                          {chunk.split("...")[0]}
                        </Text>
                        {" ..."} {chunk.split("...")[1]}
                      </Text>
                    ) : (
                      chunk
                    ),
                  )
                : point}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CMOpenedPointCard;

const styles = StyleSheet.create({
  TextContainer: { flexDirection: "row", gap: scaleSize(5) },
  orderListNumber: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(18),
    color: ThemeTextColors.white,
  },
  openOrderListNumber: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(18),
    color: ThemeTextColors.darkGray1,
  },
  title: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(18),
    color: ThemeTextColors.white,
    maxWidth: scaleSize(220),
  },
  openedCardContainer: {
    backgroundColor: ThemeBgColors.docsBg,
    borderRadius: scaleSize(14),
    paddingVertical: scaleSize(20),
  },
  openedCardtitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(18),
    color: ThemeTextColors.darkGray1,
    maxWidth: scaleSize(220),
  },
  listContainer: {
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(20),
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: scaleSize(20),
  },
  bulletPoint: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.extraLightGray,
    marginRight: scaleSize(5),
  },
  listText: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.extraLightGray,
  },
  italicText: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontStyle:"italic"
  },
  
});
