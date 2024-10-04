import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import CMGradientButton from "./CMGradientButton";
import CMLoader from "./CMLoader";
import Checkbox from "expo-checkbox";
import CMline from "./CMline";
import HospitalIcon from "../Icons/HospitalIcon";
import DoctorIcon from "../Icons/DoctorIcon";

const CMAddDataCard = () => {
  const [doctorChecked, setDoctorChecked] = useState(false);
  const [hospitalChecked, setHospitalChecked] = useState(false);
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
    // this is the card main container
    <View style={styles.container}>
      {/* this is main heading Container in side the card */}
      <View>
        <Text style={styles.mainHeadingText}>New Approval Achieved</Text>
      </View>
      {/* this is container of selection doctor and hospital */}
      <View style={styles.selectionContainer}>
        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={hospitalChecked}
              onValueChange={() => {
                setHospitalChecked(!hospitalChecked);
              }}
              style={styles.checkbox}
              color={hospitalChecked ? ThemeTextColors.darkOrange : undefined}
            />
            <Text style={styles.checkboxlabel}>Hospital/Facility</Text>
          </View>
          <View>
            <HospitalIcon width={40} height={40} />
          </View>
        </View>
        <CMline />
        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={doctorChecked}
              onValueChange={() => {
                setDoctorChecked(!doctorChecked);
              }}
              style={styles.checkbox}
              color={doctorChecked ? ThemeTextColors.darkOrange : undefined}
            />
            <Text style={styles.checkboxlabel}>Doctor</Text>
          </View>
          <View>
            <DoctorIcon width={40} height={40} />
          </View>
        </View>
        <CMline />
      </View>
    </View>
  );
};

export default CMAddDataCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: 20,
    width: "100%",
    height: 500,
    paddingVertical: 25,
    paddingHorizontal: 30,
    gap: 20,
  },
  mainHeadingText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 21,
  },
  selectionContainer: {
    fontFamily: "Jakarta-Sans-Medium",
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
    borderColor: ThemeTextColors.orange,
  },
  checkboxlabel: {
    paddingHorizontal: 8,
    paddingBottom: 4,
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 17,
    color: ThemeTextColors.darkGray1,
    justifyContent: "center",
    alignItems: "center",
  },
});
