import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMDocsCard from "../../components/CMDocs/CMDocsCard";
import CMLoader from "../../components/CMLoader";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";

const DocsScreen = () => {
  // Access current member data and update function from context
  const { currentMemberData } = useContext(CurrentMemberContext);
  const { profile } = currentMemberData || {};

  // Display a loader if member data is not yet available
  if (!currentMemberData) {
    return <CMLoader size={30} />;
  }

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
        style={styles.scrollView}
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
    marginTop: 60, // Separate header placement from content for clarity
  },
  scrollView: {
    marginTop: 90, // Avoid using inline styling in component for reusability
  },
  scrollViewContent: {
    paddingBottom: 150, // Add space at the bottom to avoid content cutoff
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: 27,
  },
  headingText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 27,
    color: ThemeTextColors.darkGray1,
  },
  cardContainer: {
    paddingHorizontal: 29,
    marginTop: 30, // Improves readability over "top" styling
  },
});
