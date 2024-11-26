import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from "react-native";
import {
  useFonts,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { myWixClient } from "../utils/createClient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Helper functions to scale font and size based on iPhone 14 Plus dimensions
const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / 430;
  return PixelRatio.roundToNearestPixel(size * scale);
};

const CMForgotPasswordModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  const handleForgotPassword = async (email) => {
    // Example logic for validation
    if (!email) {
      setMessageType("error");
      setMessage("Please enter your email address.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    // Simulate API call
    if (email.includes("@")) {
      try {
        await myWixClient.auth.sendPasswordResetEmail(
          email,
          "https://strugbitstech.wixstudio.com/isto-biologics",
        );
        setMessageType("success");
        setMessage("A reset password link has been sent to your email.");
        setTimeout(() => {
          onClose();
          setMessage("");
          setEmail("");
        }, 5000);
      } catch (error) {
        console.log("error in handleForgotPassword", error);
        if (error.details.applicationError.code == -19999) {
          setMessage("Indentity Not Found");
          setMessageType("error");
          setTimeout(() => {
            setMessage("");
          }, 5000);
        } else {
          setMessage("Something went wrong");
          setMessageType("error");
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
      }
    } else {
      setMessageType("error");
      setMessage("Invalid email address.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text
            style={[styles.title, { fontFamily: "PlusJakartaSans_700Bold" }]}
          >
            Forgot Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#B0B0B0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleForgotPassword(email)}
          >
            <Text
              style={[
                styles.buttonText,
                { fontFamily: "PlusJakartaSans_600SemiBold" },
              ]}
            >
              Submit
            </Text>
          </TouchableOpacity>
          {message ? (
            <Text
              style={[
                styles.message,
                messageType === "success" ? styles.success : styles.error,
                { fontFamily: "PlusJakartaSans_500Medium" },
              ]}
            >
              {message}
            </Text>
          ) : null}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text
              style={[
                styles.closeText,
                { fontFamily: "PlusJakartaSans_500Medium" },
              ]}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CMForgotPasswordModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleFontSize(15),
    padding: scaleFontSize(20),
    alignItems: "center",
  },
  title: {
    fontSize: scaleFontSize(20),
    color: "#333",
    marginBottom: scaleFontSize(20),
  },
  input: {
    width: "100%",
    height: scaleFontSize(50),
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: scaleFontSize(10),
    paddingHorizontal: scaleFontSize(15),
    fontSize: scaleFontSize(16),
    color: "#333",
    marginBottom: scaleFontSize(15),
  },
  button: {
    width: "100%",
    height: scaleFontSize(50),
    backgroundColor: ThemeTextColors.orange,
    borderRadius: scaleFontSize(10),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleFontSize(10),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFontSize(16),
  },
  message: {
    marginTop: scaleFontSize(10),
    fontSize: scaleFontSize(14),
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
  closeButton: {
    marginTop: scaleFontSize(15),
  },
  closeText: {
    color: ThemeTextColors.orange,
    fontSize: scaleFontSize(14),
  },
});
