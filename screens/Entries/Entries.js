import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMEntryCard from "../../components/CMEntryCard";
import CMLoader from "../../components/CMLoader";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";

const Entries = () => {
  // Access current member context to get member data and updater function
  const { currentMemberData } = useContext(CurrentMemberContext);
  const { profile } = currentMemberData || {}; // Destructure profile from currentMemberData
  // Show loader if member data is not available
  if (!currentMemberData) {
    return <CMLoader size={30} />;
  }
  return (
    <View style={styles.mainContainer}>
      {/* Header Component with profile image and name */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url} // Optional chaining for safety
          name={profile?.nickname}
        />
      </View>
      {/* ScrollView with heading and entries */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading for the Entries Page */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Entries</Text>
        </View>
        {/* Entry Card Component */}
        <View style={styles.cardContainer}>
          <CMEntryCard
            id={currentMemberData?._id} // Pass member ID and data
            currentMember={currentMemberData}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Entries;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Full screen layout
    backgroundColor: ThemeBgColors.mainBg, // Background color from theme
  },
  headerContainer: {
    marginTop: 60, // Push header down
  },
  scrollView: {
    marginTop: 90, // Position content below header
  },
  scrollViewContent: {
    paddingBottom: 150, // Add bottom padding to prevent hidden content
  },
  headingContainer: {
    flexDirection: "row", // Align heading elements in a row
    paddingHorizontal: 27, // Add horizontal padding
  },
  headingText: {
    fontFamily: "Jakarta-Sans-bold", // Custom font for heading
    fontSize: 28, // Heading font size
    color: ThemeTextColors.darkGray1, // Text color from theme
  },
  cardContainer: {
    paddingHorizontal: 29, // Add padding around the card
    marginTop: 100, // Position cards below the heading
  },
});
