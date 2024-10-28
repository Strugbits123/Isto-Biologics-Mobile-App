import { StyleSheet, Text, View } from "react-native";
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
  // Local state to track checkbox values for doctor and hospital
  const [checkedState, setCheckedState] = useState({
    doctorChecked: false,
    hospitalChecked: true,
  });

  // Load custom fonts using Expo's useFonts hook
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
  });

  // Show loader until fonts are fully loaded
  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  // Effect to initialize the checkbox states when updating existing data
  useEffect(() => {
    if (isUpdateItem && isUpdateItem.data) {
      const { doctor_points, hospital_points } = isUpdateItem.data;

      setCheckedState({
        doctorChecked: doctor_points === 3 || doctor_points === 5, // Check doctor checkbox if points match
        hospitalChecked: hospital_points > 0, // Check hospital checkbox if there are any hospital points
      });
    }
  }, [isUpdateItem]);

  // Function to handle checkbox state changes
  const handleCheckboxChange = (type) => {
    setCheckedState((prevState) => {
      const updatedState = {
        ...prevState,
        [`${type}Checked`]: !prevState[`${type}Checked`], // Toggle checkbox value
      };

      // Ensure at least one checkbox remains checked
      if (!updatedState.doctorChecked && !updatedState.hospitalChecked) {
        return prevState; // Prevent unchecking both checkboxes
      }

      return updatedState; // Return updated state if one checkbox is checked
    });
  };

  return (
    <View style={styles.container}>
      {/* Main heading */}
      <View>
        <Text style={styles.mainHeadingText}>New Approval Achieved</Text>
      </View>

      {/* Checkbox selection for Hospital and Doctor */}
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
        <CMline /> {/* Divider line */}
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
        <CMline /> {/* Divider line */}
      </View>

      {/* Render the form for adding or updating data */}
      <View>
        <CMAddDataForm
          currentMember={currentMember} // Pass the current member data
          checkedForms={checkedState} // Pass which forms (Doctor/Hospital) are checked
          submisionType={checkedState.doctorChecked ? "doctor" : "hospital"} // Determine which form type is active
          isUpdateItem={isUpdateItem} // Pass the update item if applicable
        />
      </View>
    </View>
  );
};

export default CMAddDataCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white, // White background for the card
    borderRadius: 20, // Rounded corners
    width: "100%", // Full width of the parent
    paddingVertical: 25, // Vertical padding inside the card
    paddingHorizontal: 30, // Horizontal padding inside the card
  },
  mainHeadingText: {
    fontFamily: "Jakarta-Sans-bold", // Bold font style for the heading
    fontSize: 21, // Font size for the heading
    marginBottom: 20, // Space below the heading text
    color: ThemeTextColors.darkGray1, // Dark gray text color from theme
  },
  selectionContainer: {
    fontFamily: "Jakarta-Sans-Medium", // Medium font style for selections
  },
  insideSelectionContainer: {
    flexDirection: "row", // Arrange items horizontally in a row
    justifyContent: "space-between", // Space items evenly with space between
    paddingVertical: 10, // Vertical padding between checkbox and icon
  },
});
