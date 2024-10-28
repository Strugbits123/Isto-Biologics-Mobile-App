import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import { useFonts } from "expo-font";
import CMLoader from "../CMLoader";
import CMOpenedPointCard from "./CMOpenedPointCard";
import CMClosedPointCard from "./CMClosedPointCard";

const CMDocsCard = () => {
  // Manage the open/close state of point cards
  const [point1Card, setPoint1Card] = useState(false);
  const [point2Card, setPoint2Card] = useState(false);

  // Load custom fonts and show loader until fonts are ready
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Sans-Semi-bold-Italic": require("../../assets/fonts/static/PlusJakartaSans-SemiBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  return (
    <View style={styles.container}>
      {/* Main Heading */}
      <Text style={styles.mainHeadingText}>How do I get points?</Text>

      {/* Container for point cards */}
      <View style={styles.cardsContainer}>
        {/* First point card */}
        {point1Card ? (
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
          <CMClosedPointCard
            title={"New product approval at a hospital or facility"}
            onPress={() => setPoint1Card(!point1Card)}
            listNumber={"1"}
          />
        )}

        {/* Second point card */}
        {point2Card ? (
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
          <CMClosedPointCard
            title={"New doctor using Isto product"}
            onPress={() => setPoint2Card(!point2Card)}
            listNumber={"2"}
          />
        )}

        {/* Note section */}
        <Text style={styles.noteText}>
          *New doctors and/or new product approvals do not count until the
          first case has taken place. Case information is required for
          submission.
        </Text>
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
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  mainHeadingText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 21,
    marginBottom: 20,
    color: ThemeTextColors.orange,
  },
  cardsContainer: {
    gap: 20, // Add space between cards
  },
  noteText: {
    fontFamily: "Jakarta-Sans-Semi-bold-Italic",
    fontSize: 19,
    color: ThemeTextColors.darkGray1,
    marginTop: 20, // Added margin for readability
  },
});
