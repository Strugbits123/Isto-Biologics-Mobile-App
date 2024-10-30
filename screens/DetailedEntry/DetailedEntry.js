import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMDetailEntryCard from "../../components/CMDetailEntryCard";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import CMLoader from "../../components/CMLoader";
import {useFonts, PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const DetailedEntry = () => {
  // Get current member data from context
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  // Destructure profile safely
  const { profile } = currentMemberData || {};

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
  });

  // useEffect(() => {
  //   if (fontsLoaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  // Show loader until get currentMember
  if (!currentMemberData) {
    return <CMLoader size={30} />;
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
        style={{ top: 90 }}
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
    top: 60,
  },
  cardContainer: {
    paddingHorizontal: 29,
    top: 30,
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: 27,
  },
  headingText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 28,
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
