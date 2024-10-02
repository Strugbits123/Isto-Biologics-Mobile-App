import { StyleSheet, Text, View } from "react-native";
import React from "react";
import menAvatar from "../../assets/Images/menAvatar.png";
import { Avatar } from "react-native-paper";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import MenIcon from "../../Icons/MenIcon";
const CMHomeHeader = () => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans": require("../../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-SemiBold":require("../../assets/fonts/static/PlusJakartaSans-SemiBold.ttf")
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

    // const handleLogout = () => {
  //   navigation.navigate("login");
  //   console.log("logout")
  // }

  // const options = [
  //   { label: 'Profile', onPress: () => console.log('Profile pressed') },
  //   { label: 'Logout', onPress: handleLogout, textStyle:{color:"red"} },
  // ];

  // <CMModal options={options}/>

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetingText}>Good Morning,</Text>
        <Text style={styles.nameText}>Jessica!</Text>
      </View>
      <View style={styles.imageContainer}>
        {/* when this condition got true so render image and must size is 50 50  */}
        {true ? <MenIcon width={17}  height={21}/>  : <MenIcon width={17}  height={21}/>}
      </View>
    </View>
  );
};

export default CMHomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    height: 52,
    width: "100%",
    paddingHorizontal:29
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



// const ExampleScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const options = [
//     { label: 'View', onPress: () => console.log('View pressed') },
//     { label: 'Edit', onPress: () => console.log('Edit pressed') },
//     { label: 'Delete', onPress: () => console.log('Delete pressed') },
//   ];

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={openModal} style={styles.optionButton}>
//         <Text style={styles.optionText}>Options</Text>
//       </TouchableOpacity>

//       <ReusableModal options={options} isVisible={modalVisible} onClose={closeModal} />
//     </View>
//   );
// };


// export default ExampleScreen;



// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     optionButton: {
//       padding: 10,
//       backgroundColor: 'gray',
//       borderRadius: 5,
//     },
//     optionText: {
//       color: 'white',
//     },
//   });