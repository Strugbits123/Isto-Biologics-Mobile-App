import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemeTextColors } from "../theme/theme";
import DeleteIcon from "../Icons/DeleteIcon";
import { useFonts } from "expo-font";
import CMLoader from "./CMLoader";
import CMButton from "./CMButton";

const CMConfirmationModal = ({ onCancel, onConfirm }) => {
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <View>
            <DeleteIcon width={76} height={76} />
          </View>
          <View style={{ maxWidth: 200, marginTop: 10 }}>
            <Text style={styles.text}>Are you sure you want to delete this?</Text>
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
                fontFamily: "Jakarta-Sans-Medium",
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
    fontFamily: "Jakarta-Sans-Semi-bold",
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
    fontFamily: "Jakarta-Sans-Medium",
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
