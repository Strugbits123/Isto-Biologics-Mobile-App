import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import LoginDesign from "../../assets/Images/LoginDesign.png";
import { useFonts } from "expo-font";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMLoginForm from "../../components/CMLoginForm";
import LoginIcon from "../../Icons/LoginIcon";
import CMLoader from "../../components/CMLoader";
import { LoginHandler } from "../../authentication/LoginHandler";
import { WixSessionProvider } from "../../authentication/session";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const LoginScreen = () => {
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={["#00293F", "#006BA5"]}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            <View style={{ height: 225 }}>
              <Image
                style={{ height: 214, width: "100%" }}
                source={LoginDesign}
              />
              <View style={styles.LogoTextContainer}>
                {/* <Image source={LoginLogo} /> */}
                <LoginIcon />
                <Text style={styles.text}>Welcome back!</Text>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollableContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.LoginContainer}>
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
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  topContainer: {
    flexDirection: "column",
  },
  text: {
    fontFamily: "Jakarta-Sans-bold",
    color: ThemeTextColors.white,
    fontSize: 30,
  },
  LogoTextContainer: {
    position: "absolute",
    top: 90,
    left: 31,
    gap: 33,
  },
  bottomContainer: {
    top: 80,
    backgroundColor: ThemeBgColors.white,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 30,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
});
