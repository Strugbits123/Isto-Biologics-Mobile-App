import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMEntryCard from "../../components/CMEntryCard";
import { myWixClient } from "../../utils/createClient";
import CMLoader from "../../components/CMLoader";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import { PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const Entries = () => {
  const route = useRoute();
  const { id } = route.params || {};
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);

  const { profile } = currentMemberData || {};

  if (!currentMemberData) {
    return <CMLoader size={30} />;
  }
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
          style={{ top: 90 }}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/*  heading of Entries page  */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Entires</Text>
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
    top: 60,
  },
  cardContainer: {
    paddingHorizontal: 29,
    top: 100,
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
