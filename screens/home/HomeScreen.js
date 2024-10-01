import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHeader from "../../components/CMHeader/CMHeader";
import CMHomeCard from "../../components/CMHomeCard";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";

const HomeScreen = () => {
  
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <CMHomeHeader />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText} >Statistics</Text>
      </View>
      <View style={styles.cardContainer}>
        {/* <Text style={styles.headingText} >Statistics</Text> */}
        <CMHomeCard/>
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
  headerContainer:{
    top:75
  },
  headingContainer:{
    paddingHorizontal:27,
    top:110
  },
  headingText:{
    fontFamily:"Jakarta-Sans-bold",
    fontSize:28,
    color:ThemeTextColors.darkGray1 
   },
   cardContainer:{
    paddingHorizontal:29,
    top:150
   }
});
