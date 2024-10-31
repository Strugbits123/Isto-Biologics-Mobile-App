import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMLoader from "../CMLoader";
import CMOpenedPointCard from "./CMOpenedPointCard";
import CMClosedPointCard from "./CMClosedPointCard";
import {
  useFonts,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_600SemiBold_Italic,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

const CMDocsCard = () => {
  const [point1Card, setPoint1Card] = useState(false);
  const [point2Card, setPoint2Card] = useState(false);

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_600SemiBold_Italic,
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.mainHeadingText}>How do I get points?</Text>
      </View>
      {/* this container use for list down cards for points */}
      <View style={{ gap: 20 }}>
        {point1Card ? (
          // reusable component when point card open show these component
          <CMOpenedPointCard
            title={"New product approval at a hospital or facility"}
            listNumber={"1"}
            onPress={() => setPoint1Card(!point1Card)}
            points={[
              "A new doctor is a first-time user of Isto products.",
              "A new doctor can also be a previous customer who hasn’t used our product in over 2 years and has started using again.",
              "A new doctor can also be a current customer who has started using a new product. e.g., “Dr. Smith has been a consistent Magellan user for 3 years, but just had his first Fibrant case.” ... THIS COUNTS!",
              "A new doctor can also be a previous customer who hasn’t used our product in over 2 years and has started using again.",
            ]}
          />
        ) : (
          // reusable component when point card close show these component
          <CMClosedPointCard
            title={"New product approval at a hospital or facility"}
            onPress={() => setPoint1Card(!point1Card)}
            listNumber={"1"}
          />
        )}
        {point2Card ? (
          // reusable component when point card open show these component
          <CMOpenedPointCard
            title={"New doctor using Isto product"}
            listNumber={"2"}
            onPress={() => setPoint2Card(!point2Card)}
            points={[
              "A new doctor is a first-time user of Isto products.",
              "A new doctor can also be a previous customer who hasn’t used our product in over 2 years and has started using again.",
              "A new doctor can also be a current customer who has started using a new product. e.g., “Dr. Smith has been a consistent Magellan user for 3 years, but just had his first Fibrant case.” ... THIS COUNTS!",
              "A new doctor can also be a previous customer who hasn’t used our product in over 2 years and has started using again.",
            ]}
          />
        ) : (
          // reusable component when point card close show these component
          <CMClosedPointCard
            title={"New doctor using Isto product"}
            onPress={() => setPoint2Card(!point2Card)}
            listNumber={"2"}
          />
        )}
        {/* container for text which is show on note in docs page */}
        <View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold_Italic",
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
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 21,
    marginBottom: 20,
    color: ThemeTextColors.orange,
  },
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
  },
});
