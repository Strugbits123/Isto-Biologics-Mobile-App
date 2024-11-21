import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMDocsCard from "../../components/CMDocs/CMDocsCard";
import CMLoader from "../../components/CMLoader";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import {
  useFonts,
  PlusJakartaSans_700Bold,
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

const DocsScreen = () => {
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const { profile } = currentMemberData || {};

  if (!currentMemberData) {
    return <CMLoader size={scaleSize(30)} />;
  }

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url}
          name={profile?.nickname}
        />
      </View>

      {/*  heading of Entries page  */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Contest Rules & Guidelines</Text>
      </View>

      <ScrollView
        style={{ top: scaleSize(90) }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  Entries Card Component  */}
        <View style={styles.cardContainer}>
          <CMDocsCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default DocsScreen;

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
    top: scaleSize(80)
  },
  headingText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(27),
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: scaleSize(150), // Add some bottom padding to prevent content being hidden
  },
});
