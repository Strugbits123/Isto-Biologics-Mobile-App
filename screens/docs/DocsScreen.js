import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMButton from "../../components/CMButton";
import CMToast from "../../components/CMToast";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMDocsCard from "../../components/CMDocsCard";

const DocsScreen = () => {
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
        {/*  heading of Entries page  */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Contest Rules & Guidelines</Text>
        </View>

        {/*  Entries Card Component  */}
        <View style={styles.cardContainer}>
          <CMDocsCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default DocsScreen;

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
    fontSize: 27,
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
