import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMAddDataCard from "../../components/CMAddDataCard";
import { useRoute } from "@react-navigation/native";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import { useFonts,PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

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

  // useEffect(() => {
  //   if (fontsLoaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, error]);

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
        style={{ top: 90 }}
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
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 28,
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
