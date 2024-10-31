import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMDetailEntryCard from "../../components/CMDetailEntryCard";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import CMLoader from "../../components/CMLoader";
import {useFonts, PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans";
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
const DetailedEntry = () => {
  // Get current member data from context
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  // Destructure profile safely
  const { profile } = currentMemberData || {};

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  // Show loader until get currentMember
  if (!currentMemberData) {
    return <CMLoader size={scaleSize(30)} />;
  }

  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url}
          name={profile?.nickname}
          navigationOnPage="entries"
        />
      </View>

      <ScrollView
        style={{ top: scaleSize(90) }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  heading of entires detailes page  */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Entry Details</Text>
        </View>

        {/*  add data Card Component  */}
        <View style={styles.cardContainer}>
          <CMDetailEntryCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailedEntry;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ThemeBgColors.mainBg,
  },
  headerContainer: {
    top: scaleSize(60),
  },
  cardContainer: {
    paddingHorizontal: scaleSize(29),
    top: scaleSize(30),
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: scaleSize(27),
  },
  headingText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(28),
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: scaleSize(150), // Add some bottom padding to prevent content being hidden
  },
});
