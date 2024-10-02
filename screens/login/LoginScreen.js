import { StyleSheet, Text, View, Image,ScrollView  } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import LoginDesign from "../../assets/Images/LoginDesign.png";
import LoginLogo from "../../assets/Images/LoginLogo.png";
import homeIndicator from "../../assets/Images/homeIndicator.png";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import { Button, HelperText, TextInput } from "react-native-paper";
import { InputPrefix } from "../../components/Input/InputPrefix";
import CMLoginForm from "../../components/CMLoginForm";
import LoginIcon from "../../Icons/LoginIcon";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <LinearGradient colors={["#00293F", "#006BA5"]} style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={{ height: 214, width: "100%" }} source={LoginDesign} />
        <View style={styles.LogoTextContainer}>
          {/* <Image source={LoginLogo} /> */}
          <LoginIcon/>
          <Text style={styles.text}>Welcome back!</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.LoginContainer}>
            <CMLoginForm/>
          </View>
          <View style={styles.IndicatorContainer}>
            <Image source={homeIndicator}/>
          </View>
        </View>
      </View>
    </LinearGradient>
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
    position: "relative",
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
    height:"68%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 30,
    paddingHorizontal: 30,
    justifyContent:"space-between"
  },
  IndicatorContainer:{
    alignItems:"center",
    marginTop:50,
    bottom:10
  }
});


