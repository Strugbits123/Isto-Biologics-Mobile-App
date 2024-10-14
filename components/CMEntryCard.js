import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { isLoading, useFonts } from "expo-font";
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
  });

  // Method to get all entries of user
  const getUserEntries = async () => {
    setIsLoading(true);
    try {
      const options = {
        dataCollectionId: "entries",
        referencedItemOptions: [
          {
            fieldName: "user_id",
            limit: 100,
          },
        ],
      };
      const response = await myWixClient.items
        .queryDataItems(options)
        .eq("user_id", "ad951362-37c8-4d01-a214-46cafa628440")
        .find();
      // console.log("response", response._items);
      setEntriesData(response.items);
    } catch (error) {
      console.log("error in getUserEntries", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserEntries();
  }, []);

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  const handleThreeDotPress = (item) => {
    setSelectedItem(item);
    setModalVisible(!modalVisible);
  };

  const handleCloseModal = () => {
    setDeleteModal(false);
  };

  const options = [
    {
      label: "View",
      onPress: () => {
        navigation.navigate("detailed_entry", { item: selectedItem });
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

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.EntryTitleIcon}>
          {item.data.doctor_firstname ? (
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
        <TouchableOpacity onPress={() => handleThreeDotPress(item)}>
          <ThreeDotIcon width={8} height={20} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 10 }}>
        {item.data.doctor_firstname ? (
          <>
            <View style={{ paddingVertical: 12, gap: 5 }}>
              <Text style={styles.fieldTitle}>Doctor First Name</Text>
              <Text style={styles.fieldValue}>
                {item.data.doctor_firstname}
              </Text>
            </View>
            <CMline />
            <View style={{ paddingVertical: 12, gap: 5 }}>
              <Text style={styles.fieldTitle}>Doctor Last Name</Text>
              <Text style={styles.fieldValue}>{item.data.doctor_lastname}</Text>
            </View>
          </>
        ) : (
          <View style={{ paddingVertical: 12, gap: 5 }}>
            <Text style={styles.fieldTitle}>Hospital/Facility</Text>
            <Text style={styles.fieldValue}>{item.data.hospital_name}</Text>
          </View>
        )}

        <CMline />
        <View style={{ paddingVertical: 12, gap: 5 }}>
          <Text style={styles.fieldTitle}>First Case Date</Text>
          <Text style={styles.fieldValue}>{item.data.first_case_date}</Text>
        </View>
      </View>
    </View>
  );

  return isLoading ? (
    <View style={{ top: 100 }}>
      <CMLoader size={50} />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={entriesData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 230 }}
        showsVerticalScrollIndicator={false}
      />

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
    borderRadius: 20,
    width: "100%",
    height: "auto",
  },
  cardContainer: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: 20,
    width: "100%",
    height: "auto",
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginVertical: 10,
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
