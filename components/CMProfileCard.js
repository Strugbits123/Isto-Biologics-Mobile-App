import { StyleSheet, Text, View } from "react-native";
import React from "react";
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

const CMProfileCard = () => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
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

      {/* Container of Points Information for doctor and hospital in card*/}
      <View style={{ width: "100%", gap: 15, paddingHorizontal: 2 }}></View>
      {/* Container of Buttons in card add Data btn & View Entires btn & Leaderboard */}
      <View style={{ width: "100%", height: 45 }}>
        <CMThemedButton
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
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    gap: 15,
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
  pointsInfoHeading: {
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 14,
    color: ThemeTextColors.darkGray1,
  },
  pointsTextInfo: {
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 14,
    color: ThemeTextColors.extraLightGray,
  },
  pointsNumber: {
    fontFamily: "Jakarta-Sans-Extra-bold",
    fontSize: 14,
    color: ThemeTextColors.extraLightGray,
  },
  pointsInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pointsText: {
    color: ThemeTextColors.white,
    fontSize: 16,
    fontFamily: "Jakarta-Sans-Italic-bold",
  },
  themeButton: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  themeButtonText: {
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 14,
    color: ThemeTextColors.white,
  },
  buttonText: {
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 14,
    color: ThemeTextColors.orange,
  },
  simpleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  LeaderBoardButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
