import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMEntryCard from "../../components/CMEntryCard";
import CMDetailEntryCard from "../../components/CMDetailEntryCard";

const DetailedEntry = () => {
  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader />
      </View>

      <ScrollView
        style={{ top: 80 }}
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
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 28,
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
