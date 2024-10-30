import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemeTextColors } from "../theme/theme";
import DeleteIcon from "../Icons/DeleteIcon";
import CMButton from "./CMButton";
import {
  PlusJakartaSans_700Bold,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const CMConfirmationModal = ({ onCancel, onConfirm }) => {
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_500Medium,
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
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <View>
            <DeleteIcon width={76} height={76} />
          </View>
          <View style={{ maxWidth: 200, marginTop: 10 }}>
            <Text style={styles.text}>
              Are you sure you want to delete this?
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <CMButton
              title="No"
              onPress={onCancel}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
              }}
              textStyle={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 14,
                color: ThemeTextColors.white,
              }}
            />
            <CMButton
              title="Yes"
              style={styles.simpleButton}
              textStyle={styles.buttonText}
              onPress={onConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CMConfirmationModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: 20,
    width: "80%",
    paddingVertical: 30,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 16,
    color: ThemeTextColors.darkGray1,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    gap: 10,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    color: "red",
  },
  simpleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6E6",
  },
});
