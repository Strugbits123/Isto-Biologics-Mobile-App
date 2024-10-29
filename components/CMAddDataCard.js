import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { useFonts } from "expo-font";
import CMLoader from "./CMLoader";
import CMline from "./CMline";
import HospitalIcon from "../Icons/HospitalIcon";
import DoctorIcon from "../Icons/DoctorIcon";
import CMCheckbox from "./CMCheckbox";
import CMAddDataForm from "./CMAddDataForm";

const CMAddDataCard = ({ isUpdateItem, currentMember }) => {
  const [checkedState, setCheckedState] = useState({
    doctorChecked: false,
    hospitalChecked: true,
  });
  // console.log("isUpdateItem", isUpdateItem);
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

  // Initialize checkbox state based on the passed isUpdateItem
  useEffect(() => {
    if (isUpdateItem && isUpdateItem.data) {
      const { doctor_points, hospital_points } = isUpdateItem.data;

      setCheckedState({
        doctorChecked: doctor_points === 3 || doctor_points === 5,
        hospitalChecked: hospital_points > 0,
      });
    }
  }, [isUpdateItem]);

  // handle checkbox when which one is checked
  const handleCheckboxChange = (type) => {
    setCheckedState((prevState) => {
      const updatedState = {
        ...prevState,
        [`${type}Checked`]: !prevState[`${type}Checked`],
      };

      // Ensure at least one checkbox remains checked
      if (!updatedState.doctorChecked && !updatedState.hospitalChecked) {
        return prevState; // Don't update state if both are unchecked
      }

      return updatedState;
    });
  };

  // console.log("check", checkedState);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.mainHeadingText}>New Approval Achieved</Text>
      </View>

      <View style={styles.selectionContainer}>
        <View style={styles.insideSelectionContainer}>
          {/* Hospital Checkbox */}
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
          {/* Doctor Checkbox */}
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
      {/* Always render the Doctor form */}
      <View>
        <CMAddDataForm
          currentMember={currentMember}
          checkedForms={checkedState}
          submisionType={checkedState.doctorChecked ? "doctor" : "hospital"}
          isUpdateItem={isUpdateItem}
        />
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
    color: ThemeTextColors.darkGray1,
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
