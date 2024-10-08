import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHeader from "../../components/CMHeader/CMHeader";
import CMHomeCard from "../../components/CMHomeCard";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import CMModal from "../../components/CMModal";
import CMLoader from "../../components/CMLoader";

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }


  return (
    <View style={styles.mainContainer} >
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader useInScreen={"home"}/>
      </View>
      <ScrollView
        style={{ top: 90 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  heading of main home page  */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Statistics</Text>
        </View>
        <View style={styles.cardContainer}>
          {/*  Main Card Component  */}
          {/* <Text style={styles.headingText} >Statistics</Text> */}
          <CMHomeCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ThemeBgColors.mainBg,
  },
  headerContainer: {
    top: 60,
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
  cardContainer: {
    paddingHorizontal: 29,
    top: 30,
  },
  scrollViewContent: {
    paddingBottom: 190, // Add some bottom padding to prevent content being hidden
  },
});
