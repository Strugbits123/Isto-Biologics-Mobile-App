import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BackIcon from "../../Icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const CMHeader = ({ headerTitle, titleStyle, iconColor }) => {
  const navigation = useNavigation();

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });

  // useEffect(() => {
  //   if (fontsLoaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <BackIcon color={iconColor} width={10} height={17} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerTitleContainer}>
        <Text style={[styles.headerText, titleStyle]}>{headerTitle}</Text>
      </View>
    </View>
  );
};

export default CMHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
    width: "100%",
    paddingHorizontal: 29,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 28,
  },
});
