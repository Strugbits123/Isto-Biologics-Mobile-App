import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { useFonts } from "expo-font";
import CMLoader from "./CMLoader";
import CMline from "./CMline";
import HospitalIcon from "../Icons/HospitalIcon";
import DoctorIcon from "../Icons/DoctorIcon";
import ThreeDotIcon from "../Icons/ThreeDotIcon";
import CMModal from "./CMModal";
import { useNavigation } from "@react-navigation/native";
import CMConfirmationModal from "./CMConfirmationModal";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const CMEntryCard = () => {
  const navigation = useNavigation();
  const [entriesData, setEntriesData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
  });

  const myWixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
    }),
    // Include the auth strategy and host as relevant
  });

  //method for get all entries of user
  const getUserEntries = async () => {
    try {
      const options = {
        dataCollectionId: "entries",
      };
      //get all entries by user
      const response = await myWixClient.items.queryDataItems(options).find();
      console.log("response", response);
      setEntriesData(response.items);
    } catch (error) {
      console.log("error in getUserEntries", error);
    }
  };

  useEffect(() => {
    getUserEntries();
  }, []);

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  const hanleThreeDotPress = () => {
    setModalVisible(!modalVisible); // Open modal on profile press
  };
  const handleCloseModal = () => {
    setDeleteModal(false);
  };

  const options = [
    {
      label: "View",
      onPress: () => {
        navigation.navigate("detailed_entry");
        setModalVisible(!modalVisible);
      },
    },
    {
      label: "Update",
      onPress: () => {
        navigation.navigate("add_data");
        setModalVisible(!modalVisible);
      },
    },
    {
      label: "Delete",
      onPress: () => {
        setDeleteModal(true);
        setModalVisible(!modalVisible);
      },
      textStyle: { color: "red" },
    },
  ];

  console.log("entriesData", entriesData);
  return (
    <View style={styles.container}>
      {entriesData.map((entry, index) => (
        <View key={index}>
          <View style={styles.headerContainer}>
            <View style={styles.EntryTitleIcon}>
              {entry.data.doctor_first_name ? (
                <>
                  <DoctorIcon width={40} height={40} />
                  <Text style={styles.EntryTitleText}>Doctor</Text>
                </>
              ) : (
                <>
                  <HospitalIcon width={40} height={40} />
                  <Text style={styles.EntryTitleText}>Hospital/Facility</Text>
                </>
              )}
            </View>
            <TouchableOpacity onPress={hanleThreeDotPress}>
              <ThreeDotIcon width={8} height={20} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: 10 }}>
            {true ? (
              <>
                <View style={{ paddingVertical: 12, gap: 5 }}>
                  <Text style={styles.fieldTitle}>Doctor First Name</Text>
                  <Text style={styles.fieldValue}>Smith</Text>
                </View>
                <CMline />
                <View style={{ paddingVertical: 12, gap: 5 }}>
                  <Text style={styles.fieldTitle}>Doctor Last Name</Text>
                  <Text style={styles.fieldValue}>Walter</Text>
                </View>
              </>
            ) : (
              <View style={{ paddingVertical: 12, gap: 5 }}>
                <Text style={styles.fieldTitle}>Hospital/Facility</Text>
                <Text style={styles.fieldValue}>Mayo Clinic - Rochester</Text>
              </View>
            )}

            <CMline />
            <View style={{ paddingVertical: 12, gap: 5 }}>
              <Text style={styles.fieldTitle}>First Case Date</Text>
              <Text style={styles.fieldValue}>22/5/2024</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Modal only opens when modalVisible is true */}
      {modalVisible && (
        <CMModal
          options={options}
          isVisible={modalVisible}
          modalStyle={{
            position: "absolute",
            right: 40,
            top: 40,
          }}
        />
      )}
      {deleteModal && (
        <CMConfirmationModal
          onCancel={handleCloseModal}
          onConfirm={() => {
            console.log("Item Deleted");
            handleCloseModal();
          }}
        />
      )}
    </View>
  );
};

export default CMEntryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: 20,
    width: "100%",
    height: "auto",
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  EntryTitleIcon: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  EntryTitleText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 21,
    color: ThemeTextColors.darkGray1,
  },
  fieldTitle: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 16,
    color: ThemeTextColors.darkGray1,
  },
  fieldValue: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 14,
    color: ThemeTextColors.placeholder,
  },
});
