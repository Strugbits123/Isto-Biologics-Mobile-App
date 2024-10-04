import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import CameraIcon from "../Icons/CameraIcon";
import BagdeHomeCardIcon from "../Icons/BagdeHomeCardIcon";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import CMThemedButton from "./CMThemedButton";
import { stubArray } from "lodash";
import CMButton from "./CMButton";
import CMGradientButton from "./CMGradientButton";
import { max } from "date-fns/max";
import { LoadingIndicator } from "./LoadingIndicator/LoadingIndicator";
import ArrowRight from "../Icons/ArrowRight";
import CMLoader from "./CMLoader";

const CMProfileCard = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Check error");

  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  return (
    <View style={styles.container}>
      {/* Container of profile in card  */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          {/* when this condition got true so render image and must size is 110 110  */}
          {true ? (
            <CameraIcon width={50} height={43} />
          ) : (
            <CameraIcon width={50} height={43} />
          )}
        </View>
        <Text style={styles.nameText}>Change photo</Text>
      </View>

      {/* Container of Input fields in card*/}
      <View style={{ width: "100%", gap: 0, paddingHorizontal: 2 }}>
        {/* This is container of full name or team name input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError(false)
            }}
            placeholderTextColor={ThemeTextColors.placeholder}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={name  ? name : "Enter your name"}
          />
           {error && (
              <HelperText type="error" visible={error}>
                {errorMessage}
              </HelperText>
            )}
        </View>
        {/* This is container of email input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholderTextColor={ThemeTextColors.placeholder}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={"Your email"}
            editable={false}
          />
        </View>
      </View>
      {/* Container of Buttons in card add Data btn & View Entires btn & Leaderboard */}
      <View style={{ width: "100%", height: 45 }}>
        <CMThemedButton
        gradientStyle={{paddingVertical: 10,}}
          title="Update"
          onPress={() => console.log("update btn pressed")}
          icon={<ArrowRight width={20} height={20} />}
        />
      </View>
    </View>
  );
};

export default CMProfileCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: 20,
    width: "100%",
    height: 500,
    paddingVertical: 45,
    paddingHorizontal: 30,
    alignItems: "center",
    gap: 20,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    backgroundColor: ThemeBgColors.mainBg,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#E8ECF4",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 12,
    color: ThemeTextColors.extraLightGray,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    fontFamily: "Jakarta-Sans",
    minWidth: "100%",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: "#E8ECF4",
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
  },
  inputTitle: {
    fontFamily:"Jakarta-Sans-Semi-bold",
    fontSize: 16,
    color: ThemeTextColors.darkGray1,
    marginBottom: 10,
  },
});
