import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import splashDesign from "../../assets/Images/splashDesign.png";
import SplashLogo from "../../Icons/SplashLogo";

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
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.imageContainer}>
          <SplashLogo />
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
