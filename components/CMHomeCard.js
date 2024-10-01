import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import MenIcon from "../Icons/menIcon";
import { useFonts } from "expo-font";

const CMHomeCard = () => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
  });
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          {/* when this condition got true so render image and must size is 110 110  */}
          {true ? (
            <MenIcon width={50} height={50} />
          ) : (
            <MenIcon width={50} height={50} />
          )}
        </View>
        <Text style={styles.nameText}>Jessica Kemp</Text>
      </View>
    </View>
  );
};

export default CMHomeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: 20,
    width: "100%",
    height: 400,
    padding: 30,
    alignItems: "center",
  },
  profileContainer:{
    justifyContent: 'center',
    alignItems:"center",
    gap:10
  },
  avatarContainer: {
    width: 110,
    height: 110,
    backgroundColor: ThemeBgColors.mainBg,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: ThemeTextColors.darkGray1,
    alignItems: "center",
    justifyContent: "center",
  },
  nameText:{
    fontFamily:"Jakarta-Sans-bold",
    fontSize:21,
    color:ThemeTextColors.darkGray1
  }
});
