import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { DismissKeyboardSafeAreaView } from "./DismissKeyboardHOC/DismissKeyboardSafeAreaView";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "./LoadingIndicator/LoadingIndicator";
import { HelperText } from "react-native-paper";
import OpenEyeIcon from "../Icons/OpenEyeIcon";
import ClosedEyeIcon from "../Icons/ClosedEyeIcon";
import CMThemedButton from "./CMThemedButton";
import ArrowRight from "../Icons/ArrowRight";
import Checkbox from "expo-checkbox";
import { Link, useNavigation } from "@react-navigation/native";
import { createClient, OAuthStrategy } from "@wix/sdk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CMLoginForm = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Check error");
  const [errorMessagePassword, setErrorMessagePassword] =
    useState("Check error");
  const [isChecked, setChecked] = useState(false);

  const CLIENT_ID = process.env.WIX_CLIENT_ID || "";

  const myWixClient = createClient({
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
      // tokens: {
      //   accessToken: {
      //     value: "<ACCESS_TOKEN_VALUE>",
      //     expiresAt: "<ACCESS_TOKEN_EXPIRY_DATE>",
      //   },
      //   refreshToken: {
      //     value: "<REFRESH_TOKEN_VALUE>",
      //   },
      // },
    }),
  });

  const handleLogin = async () => {
    try {
      let response = await myWixClient.auth.login({
        email: email,
        password: password,
      });
      console.log("response", response);
      await AsyncStorage.setItem("token", response.data.sessionToken);
      if (response) {
        // navigation.navigate("Bottom_Navigation");
        navigation.navigate("Bottom_Navigation", {
          screen: "home",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <View style={styles.container}>
        <Text style={styles.LoginText}>Login</Text>
        {/* inputs under this container */}
        <View>
          {/* This is container of email input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(false);
              }}
              placeholderTextColor={ThemeTextColors.placeholder}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={"Enter your email"}
            />
            {error && (
              <HelperText type="error" visible={error}>
                {errorMessage}
              </HelperText>
            )}
          </View>
          {/* This is container of password input  */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Password</Text>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
              <TextInput
                style={styles.input}
                secureTextEntry={isPasswordVisible}
                value={password}
                placeholderTextColor={ThemeTextColors.placeholder}
                onChangeText={(text) => {
                  setPassword(text);
                  setError(false);
                }}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={"Enter your password"}
              />
              {/* input icon of eye close and open */}
              <TouchableOpacity
                style={{ position: "absolute", paddingHorizontal: 17 }}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <OpenEyeIcon width={20} height={17} />
                ) : (
                  <ClosedEyeIcon width={20} height={20} />
                )}
              </TouchableOpacity>
            </View>
            {error && (
              <HelperText type="error" visible={error}>
                {errorMessagePassword}
              </HelperText>
            )}
          </View>
        </View>
        {/* This is the container of Remember me checkbox and forgot password */}
        <View style={styles.forgotPasswordAndCheckboxConatiner}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              style={styles.checkbox}
              color={isChecked ? ThemeTextColors.darkOrange : undefined}
            />
            <Text style={styles.checkboxlabel}>Remember me</Text>
          </View>
          {/* This link tag for forgot password */}
          <Text style={styles.forgotPasswordText}> Forgot Password ?</Text>
        </View>
        <CMThemedButton
          title="Login"
          onPress={handleLogin}
          icon={<ArrowRight width={20} height={20} />}
        />
        {/* <Button
          style={styles.loginButton}
          mode="contained"
          onPress={loginHandler}
          loading={sessionLoading}
        >
          Login
        </Button>
        {!sessionLoading && (
          <HelperText type="error" visible={error}>
            {errorMessage}
          </HelperText>
        )}
        <Text style={{ textAlign: "center", color: "#403F2B" }}>
          Or login with Wix Managed Login
        </Text>
        <Button
          style={styles.wixLoginButton}
          mode="outlined"
          icon={"login"}
          loading={loading}
          disabled={disabled}
          onPress={onWixLogin}
          theme={{ colors: { primary: "#403F2B" } }}
        >
          Wix Managed Login
        </Button> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CMLoginForm;

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  LoginText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 36,
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    fontFamily: "Jakarta-Sans",
    minWidth: "100%",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderColor: "#E8ECF4",
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
  },
  inputTitle: {
    fontSize: 16,
    color: ThemeTextColors.darkGray,
    marginBottom: 10,
  },
  forgotPasswordAndCheckboxConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
    width: 13,
    height: 13,
  },
  checkboxlabel: {
    paddingHorizontal: 8,
    fontFamily: "Jakarta-Sans",
    fontSize: 14,
    color: ThemeTextColors.gray1,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Jakarta-Sans",
    color: ThemeTextColors.gray,
  },
});
