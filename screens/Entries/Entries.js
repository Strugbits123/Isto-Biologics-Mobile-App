import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMEntryCard from "../../components/CMEntryCard";
import { myWixClient } from "../../utils/createClient";
import CMLoader from "../../components/CMLoader";
import { useFocusEffect, useRoute } from "@react-navigation/native";
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

const Entries = () => {
  const route = useRoute();
  const { id } = route.params || {};
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);

  const { profile } = currentMemberData || {};

  if (!currentMemberData) {
    return <CMLoader size={scaleSize(30)} />;
  }
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
  })

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <View style={styles.mainContainer}>
        {/*  Header component */}
        <View style={styles.headerContainer}>
          <CMHomeHeader
            profileImage={profile?.photo?.url}
            name={profile?.nickname}
          />
        </View>
        <View
          style={{ top: scaleSize(90) }}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/*  heading of Entries page  */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Entries</Text>
          </View>
        </View>
        {/*  Entries Card Component  */}
        <View style={styles.cardContainer}>
          <CMEntryCard
            id={currentMemberData?._id}
            currentMember={currentMemberData}
          />
        </View>
      </View>
    </>
  );
};

export default Entries;

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
    top: scaleSize(100),
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
