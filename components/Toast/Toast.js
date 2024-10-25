import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import SuccessIcon from "../../Icons/SuccessIcon";
import ErrorIcon from "../../Icons/ErrorIcon";
import WarningIcon from "../../Icons/WarningIcon";

const Toast = ({ visible, type, message }) => {
  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <SuccessIcon width={30} height={30} />;
      case "error":
        return <ErrorIcon width={30} height={30} />;
      case "warning":
        return <WarningIcon width={30} height={30} />;
      default:
        return null;
    }
  };

  const textColor =
    type === "success"
      ? "green"
      : type === "error"
      ? "red"
      : "orange"

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setToast({
              visible: false,
            });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {/* Render the correct SVG icon */}
                {renderIcon(type)}
                <Text
                  style={{
                    color:textColor,
                    marginBottom: 15,
                    textAlign: "center",
                    justifyContent: "center",
                    paddingTop: 5,
                  }}
                >
                  {message}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    bottom: 50, // Adjust this value to control how far up from the bottom the toast appears
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Ensure the background is transparent
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

});

export default Toast;
