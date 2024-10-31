import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BackIcon from "../../Icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
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

const CMHeader = ({ headerTitle, titleStyle, iconColor }) => {
  const navigation = useNavigation();

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={{
            width: scaleSize(30), // Adjust to be slightly larger than icon width
            height: scaleSize(30), // Adjust to be slightly larger than icon height
            borderRadius: scaleSize(30), // Half of the width/height for a fully rounded shape
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("home")}
        >
          <BackIcon
            color={iconColor}
            width={scaleSize(10)}
            height={scaleSize(17)}
          />
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
    height: scaleSize(52),
    width: "100%",
    paddingHorizontal: scaleSize(29),
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(28),
  },
});
