import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMAddDataCard from "../../components/CMAddDataCard";
import { useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import CMLoader from "../../components/CMLoader";

const AddData = () => {
  // State to track if the current screen is for updating an existing item
  const [isUpdate, setIsUpdate] = useState(false);

  // Extract route parameters safely
  const route = useRoute();
  const { item } = route.params || {}; 

  // Get current member data from context
  const { currentMemberData } = useContext(CurrentMemberContext);
  const { profile } = currentMemberData || {}; // Destructure profile safely

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  // useEffect to set update mode if editing an existing item
  useEffect(() => {
    setIsUpdate(!!item); // If item exists, set to update mode, otherwise set to add mode
  }, [item]);

  // Show loader until fonts are fully loaded
  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  return (
    <View style={styles.mainContainer}>
      {/* Header component with member's profile image and name */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url} // Safely access profile photo URL
          name={profile?.nickname} // Safely access member nickname
        />
      </View>

      {/* Scrollable content area for the form and heading */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading text indicating whether it's Add or Update mode */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            {isUpdate ? "Update Data" : "Add Data"}
          </Text>
        </View>

        {/* Add or Update data card component */}
        <View style={styles.cardContainer}>
          <CMAddDataCard
            currentMember={currentMemberData} // Pass current member data
            isUpdateItem={item} // Pass the item if updating
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Full-screen layout
    backgroundColor: ThemeBgColors.mainBg, // Set background color from theme
  },
  headerContainer: {
    marginTop: 60, // Position header with margin from the top
  },
  scrollView: {
    marginTop: 90, // Position ScrollView content below the header
  },
  scrollViewContent: {
    paddingBottom: 150, // Add padding to avoid hidden content at the bottom
  },
  headingContainer: {
    flexDirection: "row", // Arrange heading text horizontally
    paddingHorizontal: 27, // Add horizontal padding
  },
  headingText: {
    fontFamily: "Jakarta-Sans-bold", // Custom bold font for heading
    fontSize: 28, // Set heading font size
    color: ThemeTextColors.darkGray1, // Heading text color from theme
  },
  cardContainer: {
    paddingHorizontal: 29, // Add horizontal padding for the card
    marginTop: 30, // Add margin to position the card below the heading
  },
});
