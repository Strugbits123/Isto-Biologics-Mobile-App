import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import LoginDesign from "../../assets/Images/LoginDesign.png";
// import { useFonts } from "expo-font";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMLoginForm from "../../components/CMLoginForm";
import LoginIcon from "../../Icons/LoginIcon";
import CMLoader from "../../components/CMLoader";
import {
  useFonts,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

const LoginScreen = () => {
  // Load custom fonts for the app
  // const [fontsLoaded] = useFonts({
  //   "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  // });
  let [fontsLoaded] = useFonts({
    PlusJakartaSans_700Bold,
  });

  // Show a loader while fonts are being loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <CMLoader size={30} />
      </View>
    );
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
    height: 225,
  },
  image: {
    height: 214, // Height of the image
    width: "100%", // Full-width image
  },
  text: {
    // fontFamily: "Jakarta-Sans-bold", // Custom font for text
    fontFamily: "PlusJakartaSans_700Bold",
    color: ThemeTextColors.white, // Text color from theme
    fontSize: 30, // Font size for the welcome message
  },
  logoTextContainer: {
    position: "absolute", // Positioned over the image
    top: 90, // Distance from the top
    left: 31, // Distance from the left
    gap: 33, // Spacing between logo and text
  },
  bottomContainer: {
    top: 80, // Positioned below the image
    backgroundColor: ThemeBgColors.white, // Background color from theme
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 25, // Rounded top left corner
    borderTopRightRadius: 25, // Rounded top right corner
    paddingTop: 30, // Padding at the top
    paddingHorizontal: 30, // Horizontal padding
    justifyContent: "space-between", // Evenly space elements
  },
});
