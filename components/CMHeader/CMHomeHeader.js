import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import menAvatar from "../../assets/Images/menAvatar.png";
import { Avatar } from "react-native-paper";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import MenIcon from "../../Icons/MenIcon";
import CMModal from "../CMModal";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../Icons/BackIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { token } from "../../utils/constants";

const CMHomeHeader = ({ useInScreen, navigationOnPage }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans": require("../../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-SemiBold": require("../../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  const handleProfilePress = () => {
    setModalVisible(!modalVisible); // Open modal on profile press
  };

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
      onPress: () => {
        navigation.replace("login");
        AsyncStorage.setItem(token, "");
        setModalVisible(!modalVisible);
      },
      textStyle: { color: "red" },
    },
  ];

  return (
    <View style={styles.container} >
      {/* this condition shows header dynamic which screen shows which things  */}
      {useInScreen === "home" ? (
        <View>
          <Text style={styles.greetingText}>Good Morning,</Text>
          <Text style={styles.nameText}>Jessica!</Text>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => {navigationOnPage ? navigation.navigate(navigationOnPage) : navigation.goBack()}}>
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
          {true ? (
            <MenIcon width={17} height={21} />
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
    fontFamily: "Jakarta-Sans-SemiBold",
    fontSize: 22,
    color: ThemeTextColors.darkBlue,
  },
  nameText: {
    fontFamily: "Jakarta-Sans",
    fontSize: 22,
    color: ThemeTextColors.darkBlue,
  },
});
