import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMProfileCard from "../../components/CMProfileCard";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
// import * as SplashScreen from "expo-splash-screen";
import { PlusJakartaSans_700Bold, useFonts } from "@expo-google-fonts/plus-jakarta-sans";

// SplashScreen.preventAutoHideAsync();

const ProfileScreen = () => {
  // Accessing the current member data from context
  const { currentMemberData } = useContext(CurrentMemberContext);
  const { profile } = currentMemberData || {};

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
  });
  // Show a loader if the current member data is not available
  if (!currentMemberData) {
    return <CMLoader size={30} />;
  }

  // useEffect(() => {
  //   if (fontsLoaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, error]);

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
        style={{ top: 90 }}
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
    top: 60, // Positioning header below top
  },
  cardContainer: {
    paddingHorizontal: 29, // Left and right padding for profile card
    top: 30, // Positioning card with margin from top
  },
  headingContainer: {
    flexDirection: "row", // Ensuring proper layout for heading
    paddingHorizontal: 27, // Padding for the heading
  },
  headingText: {
    fontFamily: "PlusJakartaSans_700Bold", // Custom font for heading text
    fontSize: 28, // Font size of heading
    color: ThemeTextColors.darkGray1, // Theme-based text color
  },
  scrollViewContent: {
    paddingBottom: 150, // Bottom padding to ensure scrolling content isn't cut off
  },
  loaderContainer: {
    flex: 1, // Full-screen loading indicator
    justifyContent: "center",
    alignItems: "center",
  },
});
