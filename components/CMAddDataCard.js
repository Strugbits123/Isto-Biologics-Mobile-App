import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { useFonts } from "expo-font";
import CMLoader from "./CMLoader";
import CMline from "./CMline";
import HospitalIcon from "../Icons/HospitalIcon";
import DoctorIcon from "../Icons/DoctorIcon";
import CMCheckbox from "./CMCheckbox";
import CMAddDataForm from "./CMAddDataForm";

const CMAddDataCard = () => {
  const [checkedState, setCheckedState] = useState({
    doctorChecked: false,
    hospitalChecked: true,
  });

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

  const handleCheckboxChange = (type) => {
    setCheckedState({
      doctorChecked: type === "doctor",
      hospitalChecked: type === "hospital",
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.mainHeadingText}>New Approval Achieved</Text>
      </View>

      <View style={styles.selectionContainer}>
        <View style={styles.insideSelectionContainer}>
          {/* this is checkbox container with lable custom component redered here  */}
          <CMCheckbox
            lable={"Hospital/Facility"}
            value={checkedState.hospitalChecked}
            onValueChange={() => handleCheckboxChange("hospital")}
          />
          <View>
            <HospitalIcon width={40} height={40} />
          </View>
        </View>
        <CMline />
        <View style={styles.insideSelectionContainer}>
          {/* this is checkbox container with lable custom component redered here  */}
          <CMCheckbox
            lable={"Doctor"}
            value={checkedState.doctorChecked}
            onValueChange={() => handleCheckboxChange("doctor")}
          />
          <View>
            <DoctorIcon width={40} height={40} />
          </View>
        </View>
        <CMline />
      </View>
      {/* this is form for add data of hospital or doctor */}
      <View>
        {/* {checkedState.hospitalChecked ? <CMHospitalForm /> : <CMDoctorForm />} */}
        <CMAddDataForm submisionType={checkedState.hospitalChecked ? "hospital" : "doctor"} />
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
    height: "auto",
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  mainHeadingText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 21,
    marginBottom: 20,
  },
  selectionContainer: {
    fontFamily: "Jakarta-Sans-Medium",
  },
  insideSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
