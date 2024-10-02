import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import menAvatar from "../../assets/Images/menAvatar.png";
import { Avatar } from "react-native-paper";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import MenIcon from "../../Icons/MenIcon"
import BackIcon from "../../Icons/BackIcon";
const CMHeader = () => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans": require("../../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-SemiBold":require("../../assets/fonts/static/PlusJakartaSans-SemiBold.ttf")
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <BackIcon width={10} height={17}/>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {/* when this condition got true so render image and must size is 50 50  */}
        {true ? <MenIcon width={17}  height={21}/>  :<MenIcon width={17}  height={21}/>}
      </View>
    </View>
  );
};

export default CMHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    height: 52,
    width: "100%",
    paddingHorizontal:22
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: ThemeBgColors.white,
    borderRadius: 30,
    alignItems:"center",
    justifyContent:"center"
  },
  greetingText: {
    fontFamily: "Jakarta-Sans-SemiBold",
    fontSize:22,
    color:ThemeTextColors.darkBlue
  },
  nameText: {
    fontFamily: "Jakarta-Sans",
    fontSize:22,
    color:ThemeTextColors.darkBlue
  },
});
