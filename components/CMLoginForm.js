import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { token } from "../utils/constants";
import CMLoader from "./CMLoader";

const CMLoginForm = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
  });

  //Inputfields handleOnChange
  const handle_onChange_Text = (field, value) => {
    setData((pre) => ({ ...pre, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  //Wix headless create client method for auth clientId
  const myWixClient = createClient({
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
    }),
  });

  // Centralized validation
  const validateInputs = () => {
    let valid = true;
    let tempErrors = {};

    // Email validation
    if (!data.email || data.email.trim() === "") {
      tempErrors.email = "Email is required.";
      valid = false;
    }

    // Password validation
    if (!data.password || data.password.trim() === "") {
      tempErrors.password = "Password is required.";
      valid = false;
    }
    setErrors(tempErrors);
    return valid;
  };

  // Function to load stored email from AsyncStorage
  const loadStoredEmail = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      console.log("storedEmail", storedEmail);
      if (storedEmail) {
        setData((prev) => ({ ...prev, email: storedEmail }));
        setIsChecked(true); // Check the "Remember Me" checkbox if email is found
      }
    } catch (error) {
      console.log("Failed to load email from storage", error);
    }
  };

  useEffect(() => {
    loadStoredEmail(); // Load stored email when component mounts
  }, []);

  //handle login when user submit the login form
  const handleLogin = async () => {
    if (!validateInputs()) return;
    setIsLoading(true);
    try {
      let response = await myWixClient.auth.login({
        email: data.email,
        password: data.password,
      });
      console.log("response", response);
      if (response.loginState === "SUCCESS") {
        await AsyncStorage.setItem(token, response.data.sessionToken);

        // Save email if "Remember Me" is checked
        if (isChecked) {
          await AsyncStorage.setItem("userEmail", data.email);
        } else {
          await AsyncStorage.removeItem("userEmail"); // Remove email if unchecked
        }

        ToastAndroid.show("Login Successfully!", ToastAndroid.SHORT);
        // Clear input fields
        setData({ email: "", password: "" });
        navigation.replace("Bottom_Navigation", {
          screen: "home",
        });
      }
      console.log("Error", response.errorCode);
      if (response.loginState === "FAILURE") {
        ToastAndroid.show(response.errorCode, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!fontsLoaded ? (
        <CMLoader size={20} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.LoginText}>Login</Text>
          {/* inputs under this container */}
          <View>
            {/* This is container of email input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  handle_onChange_Text("email", text);
                }}
                value={data.email}
                placeholderTextColor={ThemeTextColors.placeholder}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={"Enter your email"}
              />
              {errors.email && (
                <HelperText type="error" visible={true}>
                  {errors.email}
                </HelperText>
              )}
            </View>
            {/* This is container of password input  */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Password</Text>
              <View
                style={{ justifyContent: "center", alignItems: "flex-end" }}
              >
                <TextInput
                  style={styles.input}
                  secureTextEntry={isPasswordVisible}
                  value={data.password}
                  placeholderTextColor={ThemeTextColors.placeholder}
                  onChangeText={(text) => {
                    handle_onChange_Text("password", text);
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
                    <OpenEyeIcon width={20} height={12} />
                  ) : (
                    <ClosedEyeIcon width={20} height={15} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && (
                <HelperText type="error" visible={true}>
                  {errors.password}
                </HelperText>
              )}
            </View>
          </View>
          {/* This is the container of Remember me checkbox and forgot password */}
          <View style={styles.forgotPasswordAndCheckboxConatiner}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={() => {
                  setIsChecked(!isChecked);
                }}
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
            icon={<ArrowRight width={20} height={20} />}
            loading={isLoading}
            onPress={handleLogin}
          />
        </View>
      )}
    </>
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
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 16,
    color: ThemeTextColors.darkGray1,
    marginBottom: 10,
  },
  forgotPasswordAndCheckboxConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: 5,
  },
  checkbox: {
    alignSelf: "center",
    width: 13,
    height: 13,
  },
  checkboxlabel: {
    paddingHorizontal: 8,
    paddingBottom: 4,
    fontFamily: "Jakarta-Sans",
    fontSize: 14,
    color: ThemeTextColors.gray1,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Jakarta-Sans",
    color: ThemeTextColors.gray,
  },
});
