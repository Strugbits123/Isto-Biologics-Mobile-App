import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import MenIcon from "../Icons/MenIcon";
import BagdeHomeCardIcon from "../Icons/BagdeHomeCardIcon";
import { LinearGradient } from "expo-linear-gradient";
import CMThemedButton from "./CMThemedButton";
import { stubArray } from "lodash";
import CMButton from "./CMButton";
import CMGradientButton from "./CMGradientButton";
import { max } from "date-fns/max";
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
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

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
  // useEffect(() => {
  //   if (fontsLoaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, error]);

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
              style={{ borderRadius: 60, borderWidth: 1 }}
              source={{ uri: profileImage }}
              width={110}
              height={110}
            />
          ) : (
            <MenIcon width={50} height={50} />
          )}
        </View>
        <Text style={styles.nameText}>{fullName ? fullName : name}</Text>
      </View>
      {/* Container of badge container in card */}
      <View style={styles.pointsContainer}>
        <BagdeHomeCardIcon width={26} height={30} />
        <Text style={styles.TotalPointsText}>Total Points </Text>
        <LinearGradient colors={["#F87655", "#EF5128"]} style={styles.gradient}>
          {isLoading ? (
            <CMLoader color={"#ffffff"} size={20} />
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
      <View style={{ width: "100%", gap: 15, paddingHorizontal: 2 }}>
        <View>
          <Text style={styles.pointsInfoHeading}>Points Break down</Text>
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
      <View style={{ gap: 8 }}>
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
    borderRadius: 20,
    width: "100%",
    height: "auto",
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
    borderWidth: 2,
    borderColor: ThemeTextColors.darkGray1,
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 21,
    color: ThemeTextColors.darkGray1,
  },
  pointsInfoHeading: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    color: ThemeTextColors.darkGray1,
  },
  pointsTextInfo: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    color: ThemeTextColors.extraLightGray,
  },
  pointsNumber: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 14,
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    gap: 8,
  },
  TotalPointsText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 16,
    color: ThemeTextColors.darkOrange,
  },
  gradient: {
    borderRadius: 15,
    paddingHorizontal: 10,
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    paddingBottom: 2,
  },
  pointsText: {
    color: ThemeTextColors.white,
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold_Italic",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    gap: 10,
  },
  themeButton: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  themeButtonText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    color: ThemeTextColors.white,
  },
  buttonText: {
    fontFamily: "PlusJakartaSans_500Medium",
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
