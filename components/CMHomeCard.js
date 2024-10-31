import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import MenIcon from "../Icons/MenIcon";
import BagdeHomeCardIcon from "../Icons/BagdeHomeCardIcon";
import { LinearGradient } from "expo-linear-gradient";
import CMButton from "./CMButton";
import CMGradientButton from "./CMGradientButton";
import CMLoader from "./CMLoader";
import { useNavigation } from "@react-navigation/native";
import CMline from "./CMline";
import { PointsContext } from "./PointsHandler";
import { CurrentMemberContext } from "./CurrentMemberHandler";
import {
  useFonts,
  PlusJakartaSans_200ExtraLight,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  PlusJakartaSans_200ExtraLight_Italic,
  PlusJakartaSans_300Light_Italic,
  PlusJakartaSans_400Regular_Italic,
  PlusJakartaSans_500Medium_Italic,
  PlusJakartaSans_600SemiBold_Italic,
  PlusJakartaSans_700Bold_Italic,
  PlusJakartaSans_800ExtraBold_Italic,
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

const CMHomeCard = ({
  totalPointsProducts = "00",
  totalPointsLeaderboard = "00",
  totalHospitalPoints = "00",
  totalDoctorPoints = "00",
  profileImage = "",
  fullName = "",
  name = "",
  isLoading = false,
  id,
}) => {
  const { totalPoints, updatePoints } = useContext(PointsContext);
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const navigation = useNavigation();

  const { profile } = currentMemberData || {};

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_200ExtraLight,
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    PlusJakartaSans_200ExtraLight_Italic,
    PlusJakartaSans_300Light_Italic,
    PlusJakartaSans_400Regular_Italic,
    PlusJakartaSans_500Medium_Italic,
    PlusJakartaSans_600SemiBold_Italic,
    PlusJakartaSans_700Bold_Italic,
    PlusJakartaSans_800ExtraBold_Italic,
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Container of profile in card  */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          {/* when this condition got true so render image and must size is 110 110  */}
          {profileImage ? (
            <Image
              style={{ borderRadius: scaleSize(70) }}
              source={{ uri: profileImage }}
              width={scaleSize(105)}
              height={scaleSize(105)}
            />
          ) : (
            <MenIcon width={scaleSize(50)} height={scaleSize(50)} />
          )}
        </View>
        <Text style={styles.nameText}>{fullName ? fullName : name}</Text>
      </View>
      {/* Container of badge container in card */}
      <View style={styles.pointsContainer}>
        <BagdeHomeCardIcon width={scaleSize(26)} height={scaleSize(30)} />
        <Text style={styles.TotalPointsText}>Total Points </Text>
        <LinearGradient colors={["#F87655", "#EF5128"]} style={styles.gradient}>
          {isLoading ? (
            <CMLoader color={"#ffffff"} size={scaleSize(20)} />
          ) : (
            <Text style={styles.pointsText}>
              {totalPoints.total_leaderboard_points !== 0
                ? totalPoints.total_leaderboard_points
                : totalPointsLeaderboard}
            </Text>
          )}
        </LinearGradient>
      </View>
      {/* Container of Points Information for doctor and hospital in card*/}
      <View
        style={{
          width: "100%",
          gap: scaleSize(15),
          paddingHorizontal: scaleSize(2),
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems:"center", gap:scaleSize(15)}}>
          <Text style={styles.pointsInfoHeading}>Points Break down</Text>
          <Text
            style={{
              backgroundColor: ThemeTextColors.lineColor,
              height: 1,
              width: scaleSize(160)
            }}
          ></Text>
        </View>
        <View style={styles.pointsInfoContainer}>
          <Text style={styles.pointsTextInfo}>New Doctor</Text>
          <Text style={styles.pointsNumber}>
            {totalPoints.total_doctor_points !== 0
              ? totalPoints.total_doctor_points
              : totalDoctorPoints}
          </Text>
        </View>
        <View style={styles.pointsInfoContainer}>
          <Text style={styles.pointsTextInfo}>New Hospital</Text>
          <Text style={styles.pointsNumber}>
            {totalPoints.total_hospital_points !== 0
              ? totalPoints.total_hospital_points
              : totalHospitalPoints}
          </Text>
        </View>
        <View style={styles.pointsInfoContainer}>
          <Text style={styles.pointsTextInfo}>Product Line</Text>
          <Text style={styles.pointsNumber}>
            {totalPoints.total_products_points !== 0
              ? totalPoints.total_products_points
              : totalPointsProducts}
          </Text>
        </View>
        <CMline />
      </View>
      {/* Container of Buttons in card add Data btn & View Entires btn & Leaderboard */}
      <View style={{ gap: scaleSize(8) }}>
        <View style={styles.buttonsContainer}>
          <CMGradientButton
            title="Add Data "
            onPress={() => navigation.navigate("add_data")}
            style={styles.themeButton}
            textStyle={styles.themeButtonText}
          />
          <CMButton
            title="View Entries "
            style={styles.simpleButton}
            textStyle={styles.buttonText}
            onPress={() => {
              navigation.navigate("entries");
            }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <CMButton
            title="Leaderboard"
            style={styles.LeaderBoardButton}
            textStyle={styles.buttonText}
            onPress={() => navigation.navigate("leaderboard", { id })}
          />
        </View>
      </View>
    </View>
  );
};

export default CMHomeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: scaleSize(20),
    width: "100%",
    height: "auto",
    paddingVertical: scaleSize(20),
    paddingHorizontal: scaleSize(30),
    alignItems: "center",
    gap: scaleSize(15),
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: scaleSize(10),
  },
  avatarContainer: {
    width: scaleSize(110),
    height: scaleSize(110),
    backgroundColor: ThemeBgColors.mainBg,
    borderRadius: scaleSize(70),
    borderWidth: scaleSize(3),
    borderColor: ThemeTextColors.darkGray1,
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(21),
    color: ThemeTextColors.darkGray1,
  },
  pointsInfoHeading: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(14),
    color: ThemeTextColors.darkGray1,
  },
  pointsTextInfo: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(14),
    color: ThemeTextColors.extraLightGray,
  },
  pointsNumber: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: scaleFontSize(14),
    color: ThemeTextColors.extraLightGray,
  },
  pointsInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ThemeBgColors.lightOrange,
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(50),
    gap: scaleSize(8),
  },
  TotalPointsText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.darkOrange,
  },
  gradient: {
    borderRadius: scaleSize(15),
    paddingHorizontal: scaleSize(10),
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    paddingBottom: scaleSize(2),
  },
  pointsText: {
    color: ThemeTextColors.white,
    fontSize: scaleFontSize(16),
    fontFamily: "PlusJakartaSans_700Bold_Italic",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    height: scaleSize(44),
    gap: scaleSize(10),
  },
  themeButton: {
    flex: 1,
    borderRadius: scaleSize(10),
    justifyContent: "center",
    alignContent: "center",
  },
  themeButtonText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(14),
    color: ThemeTextColors.white,
  },
  buttonText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(14),
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
