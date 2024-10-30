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
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

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
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning,");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon,");
    } else {
      setGreeting("Good Evening,");
    }
  }, []);

  const handleProfilePress = () => {
    setModalVisible(!modalVisible); // Open modal on profile press
  };

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

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
            onPress={() => {
              navigationOnPage
                ? navigation.navigate(navigationOnPage)
                : navigation.goBack();
            }}
          >
            <BackIcon width={10} height={17} />
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
              style={{ borderRadius: 60, borderWidth: 1 }}
              source={{ uri: profileImage }}
              width={50}
              height={50}
            />
          ) : (
            <MenIcon width={17} height={21} />
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
            right: 80,
            top: 10,
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
    height: 52,
    width: "100%",
    paddingHorizontal: 29,
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: ThemeBgColors.white,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  greetingText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 22,
    color: ThemeTextColors.darkBlue,
  },
  nameText: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 22,
    color: ThemeTextColors.darkBlue,
  },
});
