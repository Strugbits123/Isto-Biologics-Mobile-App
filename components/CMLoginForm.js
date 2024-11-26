import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { HelperText } from "react-native-paper";
import OpenEyeIcon from "../Icons/OpenEyeIcon";
import ClosedEyeIcon from "../Icons/ClosedEyeIcon";
import CMThemedButton from "./CMThemedButton";
import ArrowRight from "../Icons/ArrowRight";
import Checkbox from "expo-checkbox";
import { Link, useNavigation } from "@react-navigation/native";
import { useLoginHandler } from "../authentication/LoginHandler";
import Toast from "./Toast/Toast";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Dimensions, PixelRatio } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import * as Sentry from "@sentry/react-native";

const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / 430; // iPhone 14 Plus width as the base
  return PixelRatio.roundToNearestPixel(size * scale);
};
// Adjusts dimensions based on iPhone 14 Plus width
const scaleSize = (size) => {
  const scale = SCREEN_WIDTH / 430;
  return PixelRatio.roundToNearestPixel(size * scale);
};

const CMLoginForm = () => {
  const navigation = useNavigation();
  const { login } = useLoginHandler();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [iconType, setIconType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  //Inputfields handleOnChange
  const handle_onChange_Text = (field, value) => {
    setData((pre) => ({ ...pre, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

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

  //handle login when user submit the login form
  const handleLogin = async () => {
    if (!validateInputs()) return;
    setIsLoading(true);
    try {
      await login(data.email, data.password, isChecked);
      setToastVisible(true);
      setIconType("success");
      setErrorMessage("Logged In Successfully!");
      setTimeout(() => {
        setToastVisible(false);
        navigation.replace("Bottom_Navigation", {
          screen: "home",
        });
      }, 2000);
    } catch (error) {
      setToastVisible(true);
      setIconType("error");
      setErrorMessage(error.message || error);
      setTimeout(() => {
        setToastVisible(false);
      }, 5000);
      Sentry.captureException(error);
      console.log("error in handle login", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.LoginText}>Log in</Text>
        {/* inputs under this container */}
        <View>
          {/* This is container of email input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              ref={emailInputRef} // Assign ref
              style={styles.input}
              onChangeText={(text) => {
                handle_onChange_Text("email", text);
              }}
              value={data.email}
              placeholderTextColor={ThemeTextColors.placeholder}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={"Enter your email"}
              returnKeyType="next" // Specify "next" button on keyboard
              onSubmitEditing={() => passwordInputRef.current?.focus()} // Move focus to password
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
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
              <TextInput
                ref={passwordInputRef} // Assign ref
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
                returnKeyType="done" // Specify "done" button on keyboard
                onSubmitEditing={handleLogin} // Trigger login on "done"
              />
              {/* input icon of eye close and open */}
              <TouchableOpacity
                style={{
                  position: "absolute",
                  paddingHorizontal: scaleSize(17),
                }}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <OpenEyeIcon width={scaleSize(20)} height={scaleSize(15)} />
                ) : (
                  <ClosedEyeIcon width={scaleSize(20)} height={scaleSize(15)} />
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
            <Pressable
              style={styles.checkboxContainer}
              onPress={() => setIsChecked(!isChecked)} // Toggle checkbox state on container click
            >
              <Checkbox
                value={isChecked}
                onValueChange={() => {
                  setIsChecked(!isChecked);
                }}
                style={styles.checkbox}
                color={isChecked ? ThemeTextColors.darkOrange : undefined}
              />
              <Text style={styles.checkboxlabel}>Remember me</Text>
            </Pressable>
          {/* This link tag for forgot password */}
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </View>
        <CMThemedButton
          title="Login"
          icon={<ArrowRight width={scaleSize(20)} height={scaleSize(20)} />}
          loading={isLoading}
          onPress={handleLogin}
        />
        <Toast visible={toastVisible} type={iconType} message={errorMessage} />
      </View>
    </>
  );
};
export default CMLoginForm;

const styles = StyleSheet.create({
  container: {
    gap: scaleSize(18),
  },
  LoginText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(36),
  },
  inputContainer: {
    marginTop: scaleSize(15),
  },
  input: {
    fontFamily: "PlusJakartaSans_400Regular",
    minWidth: "100%",
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(9),
    borderColor: "#E8ECF4",
    borderWidth: scaleSize(1),
    fontSize: scaleFontSize(14),
    borderRadius: scaleSize(8),
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
  },
  inputTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.darkGray1,
    marginBottom: scaleSize(10),
  },
  forgotPasswordAndCheckboxConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: scaleSize(5),
  },
  checkbox: {
    alignSelf: "center",
    width: scaleSize(14),
    height: scaleSize(14),
  },
  checkboxlabel: {
    paddingHorizontal: scaleSize(8),
    paddingBottom: scaleSize(4),
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: scaleFontSize(14),
    color: ThemeTextColors.gray1,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: scaleFontSize(14),
    fontFamily: "PlusJakartaSans_400Regular",
    color: ThemeTextColors.gray,
  },
});
