import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import BackIcon from "../../Icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
const CMHeader = ({headerTitle}) => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans": require("../../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-SemiBold":require("../../assets/fonts/static/PlusJakartaSans-SemiBold.ttf")
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View >
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <BackIcon width={10} height={17}/>
        </TouchableOpacity>
      </View>
      <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>leaderboard</Text>
      </View>
    
    </View>
  );
};

export default CMHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    height: 52,
    width: "100%",
    paddingHorizontal:29
  },
  headerTitleContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  headerTitle:{
    fontFamily:"Jakarta-Sans-SemiBold",
    fontSize:28
  }

});
