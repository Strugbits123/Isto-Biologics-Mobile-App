import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import LoginDesign from "../../assets/Images/LoginDesign.png";
import * as SplashScreen from "expo-splash-screen";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMLoginForm from "../../components/CMLoginForm";
import LoginIcon from "../../Icons/LoginIcon";
import {
  PlusJakartaSans_700Bold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Dimensions, PixelRatio } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / 430; // iPhone 14 Plus width as the base
  return PixelRatio.roundToNearestPixel(size * scale);
};
// Adjusts dimensions based on iPhone 14 Plus width
const scaleSize = (size) => {
  const scale = SCREEN_WIDTH / 430;
  return PixelRatio.roundToNearestPixel(size * scale);
};

const LoginScreen = () => {
  // Load custom fonts for the app
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    // KeyboardAvoidingView to handle keyboard overlap on input fields
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={styles.flexGrow}>
        {/* Background gradient for the screen */}
        <LinearGradient
          colors={["#00293F", "#006BA5"]}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            {/* Image and logo container */}
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={LoginDesign} />
              <View style={styles.logoTextContainer}>
                <LoginIcon />
                <Text style={styles.text}>Welcome back!</Text>
              </View>
            </View>

            {/* Bottom container holds the login form */}
            <View style={styles.bottomContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollableContent}
                showsVerticalScrollIndicator={false}
              >
                <View>
                  <CMLoginForm />
                </View>
              </ScrollView>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1, // Full-screen loading indicator
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "column", // Main container for the screen
    height: "100%",
    width: "100%",
  },
  topContainer: {
    flexDirection: "column", // Container for image and logo
  },
  imageWrapper: {
    height: scaleSize(225),
  },
  image: {
    height: scaleSize(214), // Height of the image
    width: "100%", // Full-width image
  },
  text: {
    fontFamily: "PlusJakartaSans_700Bold",
    color: ThemeTextColors.white, // Text color from theme
    fontSize: scaleFontSize(30), // Font size for the welcome message
  },
  logoTextContainer: {
    position: "absolute", // Positioned over the image
    top: scaleSize(90), // Distance from the top
    left: scaleSize(31), // Distance from the left
    gap: scaleSize(33), // Spacing between logo and text
  },
  bottomContainer: {
    top: scaleSize(80), // Positioned below the image
    backgroundColor: ThemeBgColors.white, // Background color from theme
    width: "100%",
    height: "100%",
    borderTopLeftRadius: scaleSize(25), // Rounded top left corner
    borderTopRightRadius: scaleSize(25), // Rounded top right corner
    paddingTop: scaleSize(30), // Padding at the top
    paddingHorizontal: scaleSize(30), // Horizontal padding
    justifyContent: "space-between", // Evenly space elements
  },
});
