import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMAddDataCard from "../../components/CMAddDataCard";
import { useRoute } from "@react-navigation/native";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import { useFonts,PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans";
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

const AddData = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const route = useRoute();
  const { item } = route.params || {}; // Safely destructure item from params
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
  });

  const { profile } = currentMemberData || {};

  // Use useEffect to determine if it's an update when the screen is first loaded
  useEffect(() => {
    if (item) {
      setIsUpdate(true); // Set update mode if item exists
    } else {
      setIsUpdate(false); // Otherwise, it's adding new data
    }
  }, [item]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url}
          name={profile?.nickname}
        />
      </View>

      <ScrollView
        style={{ top: scaleSize(90) }}
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
          <CMAddDataCard
            currentMember={currentMemberData}
            isUpdateItem={item}
          />
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
    top: scaleSize(60),
  },
  cardContainer: {
    paddingHorizontal: scaleSize(29),
    top: scaleSize(30),
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: scaleSize(27),
  },
  headingText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(28),
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: scaleSize(150), // Add some bottom padding to prevent content being hidden
  },
});
