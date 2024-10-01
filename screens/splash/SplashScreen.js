import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import splashDesign from "../../assets/Images/splashDesign.png";
import splashLogo from "../../assets/Images/splashLogo.png";
import splashIndicator from "../../assets/Images/splashIndicator.png";
import SplashLogo from "../../Icons/SplashLogo";
// import SplashDesign from "../../Icons/SplashDesign";

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={["#f87655", "#ef5128"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View>
        <Image style={{ height: 300, width: "100%" }} source={splashDesign} />
        {/* <SplashDesign width={577} height={278}/> */}
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.imageContainer}>
          {/* <Image source={splashLogo} /> */}
          <SplashLogo/>
        </View>
        <View style={styles.imageContainer}>
          <Image source={splashIndicator} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  gridContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between", // Space out the rows
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
});
