import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMEntryCard from "../../components/CMEntryCard";

const Entries = () => {
  return (
    <>
      <View style={styles.mainContainer}>
        {/*  Header component */}
        <View style={styles.headerContainer}>
          <CMHomeHeader />
        </View>

        <View
          style={{ top: 80 }}
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
          <CMEntryCard />
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
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 28,
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
