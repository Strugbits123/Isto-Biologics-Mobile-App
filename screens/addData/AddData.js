import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMAddDataCard from "../../components/CMAddDataCard";
import { useRoute } from "@react-navigation/native";

const AddData = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const route = useRoute();
  const { item } = route.params || {}; // Safely destructure item from params

  // Use useEffect to determine if it's an update when the screen is first loaded
  useEffect(() => {
    if (item) {
      setIsUpdate(true); // Set update mode if item exists
    } else {
      setIsUpdate(false); // Otherwise, it's adding new data
    }
  }, [item]);
  console.log("isUpdate", isUpdate);
  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader />
      </View>

      <ScrollView
        style={{ top: 80 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  heading of Add data */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            {isUpdate ? "Update Data" : "Add Data"}
          </Text>
        </View>

        {/*  add data Card Component  */}
        <View style={styles.cardContainer}>
          <CMAddDataCard isUpdateItem={item} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ThemeBgColors.mainBg,
  },
  headerContainer: {
    top: 60,
  },
  cardContainer: {
    paddingHorizontal: 29,
    top: 30,
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: 27,
  },
  headingText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 28,
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
