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
import { useFonts } from "expo-font";
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

const CMProfileCard = () => {
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Check error");
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [iconType, setIconType] = useState("");
  const [message, setMessage] = useState("");
  const { profile, loginEmail, contact } = currentMemberData || {};
  const queryClient = useQueryClient();
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-Extra-bold": require("../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
  });

  const showToast = (visible, typeOfIcon, message) => {
    setToastVisible(visible);
    setIconType(typeOfIcon);
    setMessage(message);
  };

  useEffect(() => {
    setImageUri(profile?.photo?.url);
    setName(contact?.firstName);
  }, [currentMemberData]);

  // https://www.mysite.com/_functions/myFunction/John/Doe
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

  async function uploadMyFile(fileUri) {
    try {
      let mimeType = fileUri.assets[0].mimeType;
      let fileName = fileUri.assets[0].fileName;
      let filePath = fileUri.assets[0].uri; // The URI of the file
      // console.log("mimeType", mimeType);
      // console.log("file Uri", fileUri);
      // console.log("fileName", fileName);
      const uploadUrl = await generateUploadUrl(mimeType);
      // console.log("uploadUrl", uploadUrl);
      // Read the file content as binary using FileSystem
      const fileContents = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert the Base64 data to a Buffer
      const fileBuffer = Buffer.from(fileContents, "base64");
      // Image upload request code with wix actual documentation
      const params = { filename: `${Date.now()}_${fileName}` };
      const headers = {
        "Content-Type": mimeType,
      };

      // Upload the file using PUT request
      const uploadResponse = await axios.put(uploadUrl, fileBuffer, {
        headers,
        params,
      });

      // Handle response
      // console.log("uploadResponse", uploadResponse);
      if (uploadResponse.status !== 200) {
        throw new Error("File upload failed");
      }
      const uploadData = uploadResponse.data; // Assuming the response is JSON
      console.log("uploadData", uploadData);
      setImageUri(uploadData.file.url);
      // const file = await getFileDescriptor(uploadData.file.id); // Calling the getFileDescriptor function with the file ID
      // return file;
      return uploadData;
    } catch (error) {
      return error;
      // console.log("error in uploadMyFile", error);
    }
  }

  const updateUser = async (id) => {
    setLoading(true);
    try {
      let imageResponse;
      let updatedMemberDataToSend;
      console.log("image", image);
      if (!image) {
        updatedMemberDataToSend = {
          contact: {
            firstName: name,
          },
        };
      } else {
        imageResponse = await uploadMyFile(image);
        console.log("imageResponse", imageResponse);
        updatedMemberDataToSend = {
          contact: {
            firstName: name,
          },
          profile: {
            photo: {
              _id: imageResponse?.file?.id,
              url: imageResponse?.file?.url,
            },
          },
        };
      }
      console.log("updatedMemberDataToSend", updatedMemberDataToSend);
      const updatedMemberResponse = await myWixClient.members.updateMember(
        currentMemberData?._id,
        updatedMemberDataToSend,
      );
      console.log("updatedMemberResponse", updatedMemberResponse);
      if (updatedMemberResponse) {
        showToast(true, "success", "Profile updated Successfully!");
        setTimeout(() => {
          setToastVisible(false);
        }, 5000);

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
        // Update local state
        setImage(null);
        // if (!image) {
        //   setImage(null);
        //   updateCurrentMemberData({
        //     ...currentMemberData,
        //     firstName: updatedMemberResponse?.contact?.firstName,
        //   });
        // } else {
        //   setImage(null);
        //   updateCurrentMemberData({
        //     ...currentMemberData,
        //     profile: {
        //       photo: {
        //         _id: imageResponse?.file?.id,
        //         url: imageResponse?.file?.url,
        //       },
        //     },
        //     firstName: updatedMemberResponse?.contact?.firstName,
        //   });
        // }
      }
    } catch (error) {
      console.log("Error in updateMember ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //Pick image from galery
  const pickImageFromGallery = async () => {
    // check permision of galery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      showToast(true, "error", "Permission to access gallery is required!");
      setTimeout(() => {
        setToastVisible(false);
      }, 5000);
      return;
    }

    // take image from galery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("result of image launchImageLibraryAsync", result);
    if (!result.canceled) {
      const fileSizeInMB = result.assets[0].fileSize / (1024 * 1024); // Convert file size from bytes to MB
      // console.log("File Size (MB):", fileSizeInMB);
      if (fileSizeInMB > 2) {
        // Show message if file size exceeds 3M
        setVisible(false);
        showToast(
          true,
          "error",
          "Selected image exceeds 2MB, please choose a smaller image.",
        );
        setTimeout(() => {
          setToastVisible(false);
        }, 5000);
        return;
      }

      setImage(result);
      setImageUri(result.assets[0].uri);
    }
    setVisible(false);
  };

  // Take image from camera
  const takeImageWithCamera = async () => {
    // check camera permision
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      showToast(true, "error", "Permission to access gallery is required!");
      setTimeout(() => {
        setToastVisible(false);
      }, 5000);
      return;
    }

    // Camera se image lena
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fileSizeInMB = result.assets[0].fileSize / (1024 * 1024); // Convert file size from bytes to MB
      // console.log("File Size (MB):", fileSizeInMB);

      if (fileSizeInMB > 2) {
        setVisible(false);
        // Show message if file size exceeds 3MB
        showToast(
          true,
          "error",
          "Captured image exceeds 2MB, please reduce the image size.",
        );
        setTimeout(() => {
          setToastVisible(false);
        }, 5000);
        return;
      }
      setImage(result);
      setImageUri(result.assets[0].uri);
    }
    setVisible(false);
  };

  // console.log("image in CMProfileCard ===>", image);
  // console.log("Wix upload imageUrl ", wixUploadUrl);

  const hideDialog = () => setVisible(false);
  if (!fontsLoaded) {
    return <CMLoader size={20} />;
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
              width={110}
              height={110}
            />
          ) : (
            <CameraIcon width={50} height={43} />
          )}
        </View>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={styles.nameText}>Change photo</Text>
        </TouchableOpacity>
      </View>

      {/* Container of Input fields in card*/}
      <View style={{ width: "100%", gap: 0, paddingHorizontal: 2 }}>
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
      <View style={{ width: "100%", height: 45 }}>
        <CMThemedButton
          gradientStyle={{ paddingVertical: 10 }}
          title="Update"
          onPress={async () => {
            updateUser(currentMemberData?._id);
            // const imageResponse = await uploadMyFile(wixUploadUrl, image);
            // console.log("imageResponse", imageResponse);
          }}
          loading={loading}
          icon={<ArrowRight width={20} height={20} />}
        />
      </View>
      <Modal transparent={true} animationType="slide" visible={visible}>
        <View style={styles.modalContainer}>
          <View>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={pickImageFromGallery}
              >
                <GalleryIcon width={20} height={20} />
                <Text style={styles.modalButton}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={takeImageWithCamera}
              >
                <CameraIcon width={20} height={20} />
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
    borderRadius: 20,
    width: "100%",
    height: "auto",
    paddingVertical: 45,
    paddingHorizontal: 30,
    alignItems: "center",
    gap: 20,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    backgroundColor: ThemeBgColors.mainBg,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#E8ECF4",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 12,
    color: ThemeTextColors.extraLightGray,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    fontFamily: "Jakarta-Sans",
    minWidth: "100%",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: "#E8ECF4",
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
  },
  inputTitle: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 16,
    color: ThemeTextColors.darkGray1,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Puts the modal at the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Makes the background a bit dark
  },
  modalContent: {
    flexDirection: "row",
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  modalButton: {
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 15,
    color: ThemeTextColors.extraLightGray,
  },
});
