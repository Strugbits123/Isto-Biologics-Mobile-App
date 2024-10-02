import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHeader from "../../components/CMHeader/CMHeader";
import CMHomeCard from "../../components/CMHomeCard";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import CMModal from "../../components/CMModal";

const HomeScreen = ({navigation}) => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader />
      </View>
      {/*  heading of main home page  */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Statistics</Text>
      </View>
      {/*  Main Card Component  */}
      <View style={styles.cardContainer}>
        {/* <Text style={styles.headingText} >Statistics</Text> */}
        <CMHomeCard />
      </View>
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
    top: 75,
  },
  headingContainer: {
    paddingHorizontal: 27,
    top: 90,
  },
  headingText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 28,
    color: ThemeTextColors.darkGray1,
  },
  cardContainer: {
    paddingHorizontal: 29,
    top: 120,
  },
});
