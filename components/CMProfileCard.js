import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import CameraIcon from "../Icons/CameraIcon";
import CMThemedButton from "./CMThemedButton";
import ArrowRight from "../Icons/ArrowRight";
import CMLoader from "./CMLoader";
import * as ImagePicker from "expo-image-picker";
import GalleryIcon from "../Icons/GaleryIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { myWixClient } from "../utils/createClient";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import { CurrentMemberContext } from "./CurrentMemberHandler";
import Toast from "./Toast/Toast";
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


const CMProfileCard = () => {
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const [visible, setVisible] = useState(false); // For handling modal visibility
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Check error");
  const [image, setImage] = useState(null); // For storing the selected image
  const [imageUri, setImageUri] = useState(null); // For displaying the image URI
  const [loading, setLoading] = useState(false); // To show loading spinner during update
  const [toastVisible, setToastVisible] = useState(false);
  const [iconType, setIconType] = useState("");
  const [message, setMessage] = useState("");
  const { profile, loginEmail, contact } = currentMemberData || {}; // Destructure member data
  const queryClient = useQueryClient(); // TanStack Query client for cache and updates

  let [fontsLoaded, errorFonts] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  // Helper function to show toast notifications
  const showToast = (visible, typeOfIcon, message) => {
    setToastVisible(visible);
    setIconType(typeOfIcon);
    setMessage(message);
  };

  // Set the profile image URI and name on component mount
  useEffect(() => {
    setImageUri(profile?.photo?.url);
    setName(contact?.firstName);
  }, [currentMemberData]);

  // Generate a signed URL for file upload
  const generateUploadUrl = async (mimeType) => {
    try {
      const urlResponse = await axios.get(
        `https://strugbitstech.wixstudio.io/isto-biologics/_functions/imageUploadUrl/${mimeType}`,
      );
      return urlResponse.data.url;
    } catch (error) {
      return error;
    }
  };

  // Function to upload file to the server
  async function uploadMyFile(fileUri) {
    try {
      let mimeType = fileUri.assets[0].mimeType;
      let fileName = fileUri.assets[0].fileName;
      let filePath = fileUri.assets[0].uri; // The URI of the file

      // Get upload URL from server
      const uploadUrl = await generateUploadUrl(mimeType);

      // Read file contents as Base64
      const fileContents = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert the Base64 data to Buffer
      const fileBuffer = Buffer.from(fileContents, "base64");

      const params = { filename: `${Date.now()}_${fileName}` };
      const headers = { "Content-Type": mimeType };

      // Upload file to the server
      const uploadResponse = await axios.put(uploadUrl, fileBuffer, {
        headers,
        params,
      });

      if (uploadResponse.status !== 200) {
        throw new Error("File upload failed");
      }

      const uploadData = uploadResponse.data;
      setImageUri(uploadData.file.url); // Set uploaded image URL in state
      return uploadData;
    } catch (error) {
      return error;
    }
  }

  // Update user profile with new image or details
  const updateUser = async (id) => {
    setLoading(true);
    try {
      let imageResponse;
      let updatedMemberDataToSend;

      if (!image) {
        // Update only name if no image is selected
        updatedMemberDataToSend = {
          contact: { firstName: name },
        };
      } else {
        imageResponse = await uploadMyFile(image);
        updatedMemberDataToSend = {
          contact: { firstName: name },
          profile: {
            photo: {
              _id: imageResponse?.file?.id,
              url: imageResponse?.file?.url,
            },
          },
        };
      }

      // Update member data in the server
      const updatedMemberResponse = await myWixClient.members.updateMember(
        currentMemberData?._id,
        updatedMemberDataToSend,
      );

      if (updatedMemberResponse) {
        showToast(true, "success", "Profile updated successfully!");
        setTimeout(() => setToastVisible(false), 5000);

        // Update local member data
        updateCurrentMemberData({
          ...currentMemberData,
          contact: {
            ...currentMemberData.contact,
            firstName: updatedMemberResponse?.contact?.firstName,
          },
          ...(image && {
            profile: {
              ...currentMemberData.profile,
              photo: {
                _id: imageResponse?.file?.id,
                url: imageResponse?.file?.url,
              },
            },
          }),
        });
        setImage(null); // Reset image after update
      }
    } catch (error) {
      console.log("Error in updateMember", error);
    } finally {
      setLoading(false);
    }
  };

  // Pick an image from the gallery
  const pickImageFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      showToast(true, "error", "Permission to access gallery is required!");
      setTimeout(() => setToastVisible(false), 5000);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fileSizeInMB = result.assets[0].fileSize / (1024 * 1024); // Convert file size from bytes to MB

      if (fileSizeInMB > 2) {
        showToast(
          true,
          "error",
          "Selected image exceeds 2MB, please choose a smaller image.",
        );
        setTimeout(() => setToastVisible(false), 5000);
        return;
      }

      setImage(result);
      setImageUri(result.assets[0].uri);
    }
    setVisible(false);
  };

  // Capture an image using the camera
  const takeImageWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      showToast(true, "error", "Permission to access camera is required!");
      setTimeout(() => setToastVisible(false), 5000);
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fileSizeInMB = result.assets[0].fileSize / (1024 * 1024); // Convert file size from bytes to MB

      if (fileSizeInMB > 2) {
        showToast(
          true,
          "error",
          "Captured image exceeds 2MB, please reduce the image size.",
        );
        setTimeout(() => setToastVisible(false), 5000);
        return;
      }
      setImage(result);
      setImageUri(result.assets[0].uri);
    }
    setVisible(false);
  };

  // Hide the modal dialog
  const hideDialog = () => setVisible(false);


  if (!fontsLoaded && !errorFonts) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Container of profile in card  */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          {/* when this condition got true so render image and must size is 110 110  */}
          {imageUri ? (
            <Image
              style={styles.avatarContainer}
              source={{ uri: imageUri }}
              width={scaleSize(110)}
              height={scaleSize(110)}
            />
          ) : (
            <CameraIcon width={scaleSize(50)} height={scaleSize(43)} />
          )}
        </View>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={styles.nameText}>Change photo</Text>
        </TouchableOpacity>
      </View>

      {/* Container of Input fields in card*/}
      <View style={{ width: "100%", gap: 0, paddingHorizontal: scaleSize(2) }}>
        {/* This is container of full name or team name input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError(false);
            }}
            placeholderTextColor={ThemeTextColors.placeholder}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={name ? name : "Enter your name"}
          />
          {error && (
            <HelperText type="error" visible={error}>
              {errorMessage}
            </HelperText>
          )}
        </View>
        {/* This is container of email input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            value={loginEmail}
            placeholderTextColor={ThemeTextColors.placeholder}
            autoCorrect={false}
            autoCapitalize="none"
            editable={false}
          />
        </View>
      </View>
      {/* Container of Buttons in card add Data btn & View Entires btn & Leaderboard */}
      <View style={{ width: "100%", height: scaleSize(45) }}>
        <CMThemedButton
          gradientStyle={{ paddingVertical: scaleSize(10) }}
          title="Update"
          onPress={async () => {
            updateUser(currentMemberData?._id);
            // const imageResponse = await uploadMyFile(wixUploadUrl, image);
            // console.log("imageResponse", imageResponse);
          }}
          loading={loading}
          icon={<ArrowRight width={scaleSize(20)} height={scaleSize(20)} />}
        />
      </View>
      <Modal transparent={true} animationType="slide" visible={visible}>
        <View style={styles.modalContainer}>
          <View>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: scaleSize(10),
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={pickImageFromGallery}
              >
                <GalleryIcon width={scaleSize(20)} height={scaleSize(20)} />
                <Text style={styles.modalButton}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: scaleSize(10),
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={takeImageWithCamera}
              >
                <CameraIcon width={scaleSize(20)} height={scaleSize(20)} />
                <Text style={styles.modalButton}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={hideDialog}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast visible={toastVisible} type={iconType} message={message} />
    </View>
  );
};
export default CMProfileCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: scaleSize(20),
    width: "100%",
    height: "auto",
    paddingVertical: scaleSize(45),
    paddingHorizontal: scaleSize(30),
    alignItems: "center",
    gap: scaleSize(20),
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: scaleSize(10),
  },
  avatarContainer: {
    width: scaleSize(110),
    height: scaleSize(110),
    backgroundColor: ThemeBgColors.mainBg,
    borderRadius: scaleSize(60),
    borderWidth: scaleSize(1),
    borderColor: "#E8ECF4",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(12),
    color: ThemeTextColors.extraLightGray,
  },
  inputContainer: {
    marginTop: scaleSize(10),
  },
  input: {
    fontFamily: "PlusJakartaSans_400Regular",
    minWidth: "100%",
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(8),
    borderColor: "#E8ECF4",
    borderWidth: scaleSize(1),
    fontSize: scaleFontSize(14),
    borderRadius: scaleSize(8),
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
  },
  inputTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.darkGray1,
    marginBottom: scaleSize(10),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Puts the modal at the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Makes the background a bit dark
  },
  modalContent: {
    flexDirection: "row",
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
    padding: scaleSize(15),
    alignItems: "center",
    justifyContent: "center",
    gap: scaleSize(10),
  },
  modalButton: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(15),
    color: ThemeTextColors.extraLightGray,
  },
});
