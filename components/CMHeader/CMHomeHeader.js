import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import MenIcon from "../../Icons/MenIcon";
import CMModal from "../CMModal";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../Icons/BackIcon";
import { useWixSession } from "../../authentication/session";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "@tanstack/react-query";
import { CurrentMemberContext } from "../CurrentMemberHandler";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
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

const CMHomeHeader = ({
  useInScreen,
  navigationOnPage,
  profileImage = "",
  name = "",
  fullName = "",
}) => {
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { newVisitorSession } = useWixSession();
  const [modalVisible, setModalVisible] = useState(false);
  const [greeting, setGreeting] = useState("Good Morning");

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });
  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    if (currentHour < 12) {
      setGreeting("Good Morning,");
    } else if (
      currentHour < 17 ||
      (currentHour === 17 && currentMinute === 0)
    ) {
      setGreeting("Good Afternoon,");
    } else {
      setGreeting("Good Evening,");
    }
  }, []);

  const handleProfilePress = () => {
    setModalVisible(!modalVisible); // Open modal on profile press
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  const options = [
    {
      label: "Profile",
      onPress: () => {
        navigation.navigate("profile");
        setModalVisible(!modalVisible);
      },
    },
    {
      label: "Logout",
      onPress: async () => {
        // console.log("logout");
        await SecureStore.deleteItemAsync("wixSession");
        await newVisitorSession();
        updateCurrentMemberData(null);
        navigation.navigate("login");
        setModalVisible(!modalVisible);
      },
      textStyle: { color: "red" },
    },
  ];

  return (
    <View style={styles.container}>
      {/* this condition shows header dynamic which screen shows which things  */}
      {useInScreen === "home" ? (
        <View>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text style={styles.nameText}>{fullName ? fullName : name}!</Text>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={{
              width: scaleSize(30), // Adjust to be slightly larger than icon width
              height: scaleSize(30), // Adjust to be slightly larger than icon height
              borderRadius: scaleSize(30), // Half of the width/height for a fully rounded shape
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              navigationOnPage
                ? navigation.navigate(navigationOnPage)
                : navigation.goBack();
            }}
          >
            <BackIcon width={scaleSize(10)} height={scaleSize(17)} />
          </TouchableOpacity>
        </View>
      )}
      {/* this is the container of profile image container at right side of header */}
      <View style={styles.imageContainer}>
        {/* when this condition got true so render image and must size is 50 50  */}
        <TouchableOpacity
          onPress={handleProfilePress}
          style={styles.imageContainer}
        >
          {profileImage ? (
            <Image
              style={{ borderRadius: scaleSize(60), borderWidth: scaleSize(1) }}
              source={{ uri: profileImage }}
              width={scaleSize(50)}
              height={scaleSize(50)}
            />
          ) : (
            <MenIcon width={scaleSize(17)} height={scaleSize(21)} />
          )}
        </TouchableOpacity>
      </View>
      {/* Modal only opens when modalVisible is true */}
      {modalVisible && (
        <CMModal
          options={options}
          isVisible={modalVisible}
          modalStyle={{
            position: "absolute",
            right: scaleSize(80),
            top: scaleSize(10),
          }}
        />
      )}
    </View>
  );
};

export default CMHomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scaleSize(52),
    width: "100%",
    paddingHorizontal: scaleSize(29),
  },
  imageContainer: {
    width: scaleSize(50),
    height: scaleSize(50),
    backgroundColor: ThemeBgColors.white,
    borderRadius: scaleSize(30),
    alignItems: "center",
    justifyContent: "center",
  },
  greetingText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(22),
    color: ThemeTextColors.darkBlue,
  },
  nameText: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: scaleFontSize(22),
    color: ThemeTextColors.darkBlue,
  },
});
