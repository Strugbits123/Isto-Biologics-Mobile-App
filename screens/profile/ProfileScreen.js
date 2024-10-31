import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMProfileCard from "../../components/CMProfileCard";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import { PlusJakartaSans_700Bold, useFonts } from "@expo-google-fonts/plus-jakarta-sans";
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

const ProfileScreen = () => {
  // Accessing the current member data from context
  const { currentMemberData } = useContext(CurrentMemberContext);
  const { profile } = currentMemberData || {};

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
  });
  // Show a loader if the current member data is not available
  if (!currentMemberData) {
    return <CMLoader size={scaleSize(30)} />;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      {/* Header section with profile image and nickname */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url}
          name={profile?.nickname}
        />
      </View>

      {/* Scrollable content section for profile details */}
      <ScrollView
        style={{ top: scaleSize(90) }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading for the profile section */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Profile</Text>
        </View>

        {/* Profile card with user's information */}
        <View style={styles.cardContainer}>
          <CMProfileCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ThemeBgColors.mainBg, // Background color theme
  },
  headerContainer: {
    top: scaleSize(60), // Positioning header below top
  },
  cardContainer: {
    paddingHorizontal: scaleSize(29), // Left and right padding for profile card
    top: scaleSize(30), // Positioning card with margin from top
  },
  headingContainer: {
    flexDirection: "row", // Ensuring proper layout for heading
    paddingHorizontal: scaleSize(27), // Padding for the heading
  },
  headingText: {
    fontFamily: "PlusJakartaSans_700Bold", // Custom font for heading text
    fontSize: scaleFontSize(28), // Font size of heading
    color: ThemeTextColors.darkGray1, // Theme-based text color
  },
  scrollViewContent: {
    paddingBottom: scaleSize(150), // Bottom padding to ensure scrolling content isn't cut off
  },
  loaderContainer: {
    flex: 1, // Full-screen loading indicator
    justifyContent: "center",
    alignItems: "center",
  },
});
