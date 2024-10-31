import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemeTextColors } from "../theme/theme";
import DeleteIcon from "../Icons/DeleteIcon";
import CMButton from "./CMButton";
import {
  useFonts,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_500Medium,
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

const CMConfirmationModal = ({ onCancel, onConfirm }) => {
  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <View>
            <DeleteIcon width={scaleSize(76)} height={scaleSize(76)} />
          </View>
          <View style={{ maxWidth: scaleSize(200), marginTop: scaleSize(10) }}>
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
                fontSize: scaleFontSize(14),
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
    borderRadius: scaleSize(20),
    width: "80%",
    paddingVertical: scaleSize(30),
    paddingHorizontal: scaleSize(30),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.darkGray1,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    height: scaleSize(44),
    gap: scaleSize(10),
    marginTop: scaleSize(20),
  },
  buttonText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(14),
    color: "red",
  },
  simpleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6E6",
  },
});
