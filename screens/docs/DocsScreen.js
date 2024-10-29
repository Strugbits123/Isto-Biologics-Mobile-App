import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMDocsCard from "../../components/CMDocs/CMDocsCard";
import CMLoader from "../../components/CMLoader";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import {
  useFonts,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

const DocsScreen = () => {
  // Access current member data and update function from context
  const { currentMemberData } = useContext(CurrentMemberContext);
  const { profile } = currentMemberData || {};

  // Display a loader if member data is not yet available
  if (!currentMemberData) {
    return <CMLoader size={30} />;
  }

  let [fontsLoaded] = useFonts({
    PlusJakartaSans_700Bold,
  });

  return (
    <View style={styles.mainContainer}>
      {/* Header section with profile information */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url}
          name={profile?.nickname}
        />
      </View>

      {/* Scrollable content area for contest rules */}
      <ScrollView
        style={{ top: 90 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading section */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Contest Rules & Guidelines</Text>
        </View>

        {/* Documentation card */}
        <View style={styles.cardContainer}>
          <CMDocsCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default DocsScreen;

// Styling for DocsScreen components

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
    fontSize: 27,
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
