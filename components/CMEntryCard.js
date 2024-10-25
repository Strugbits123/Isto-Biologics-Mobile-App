import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import { myWixClient } from "../utils/createClient";
import { PointsContext } from "./PointsHandler";
import { CurrentMemberContext } from "./CurrentMemberHandler";
import Toast from "./Toast/Toast";

const CMEntryCard = ({ currentMember, id }) => {
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const navigation = useNavigation();
  const [entriesData, setEntriesData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { totalPoints, updatePoints } = useContext(PointsContext);
  const [toastVisible, setToastVisible] = useState(false);
  const [iconType, setIconType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // console.log("currentMember", currentMember._id);

  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Italic-bold": require("../assets/fonts/static/PlusJakartaSans-BoldItalic.ttf"),
    "Jakarta-Sans-Semi-bold": require("../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Sans": require("../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
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
        .eq("user_id", currentMemberData?._id)
        .find();
      // console.log("response", response._items);
      setEntriesData(response.items);
    } catch (error) {
      console.log("error in getUserEntries", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await getUserEntries(); // Refresh data
    setRefreshing(false); // End refreshing state
  };

  useEffect(() => {
    getUserEntries();
  }, [refresh, currentMemberData]);

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  // Three dot press opens a dropdown for view entry, update, and delete
  const handleThreeDotPress = (item, index) => {
    setSelectedItem(item);
    if (modalIndex === index) {
      // If the modal is already open for the same item, close it
      setModalIndex(null);
    } else {
      // Otherwise, open the modal for this item
      setModalIndex(index);
    }
  };

  //handle close modal function
  const handleCloseModal = () => {
    setDeleteModal(false);
    setModalIndex(null);
  };

  //handle delete entry function
  const handleDeleteEntry = async (selectedItem) => {
    try {
      //first we delete entry from entries collection
      // console.log("selectedItem", selectedItem);

      const deleteEntryOptions = {
        dataCollectionId: "entries",
      };
      const deletedItemResponse = await myWixClient.items.removeDataItem(
        selectedItem._id,
        deleteEntryOptions,
      );

      const leaderboardOptions = {
        dataCollectionId: "leaderboard",
      };
      // console.log(
      //   " selectedItem.data.user_id._id",
      //   selectedItem.data.user_id._id,
      // );
      //get leaderboard data for subtract points
      const getLeaderboardUsers = await myWixClient.items
        .queryDataItems(leaderboardOptions)
        .eq("user_id", selectedItem.data.user_id._id)
        .find();
      // console.log("getLeaderboardUsers", getLeaderboardUsers);

      const updateLeaderboardPoints = {
        user_id: selectedItem.data.user_id._id,
        total_magellan_points:
          getLeaderboardUsers._items[0].data.total_magellan_points -
          selectedItem.data.magellan_points,
        total_influx_points:
          getLeaderboardUsers._items[0].data.total_influx_points -
          selectedItem.data.influx_points,
        total_sparc_points:
          getLeaderboardUsers._items[0].data.total_sparc_points -
          selectedItem.data.sparc_points,
        total_inqu_points:
          getLeaderboardUsers._items[0].data.total_inqu_points -
          selectedItem.data.inqu_points,
        total_fibrant_points:
          getLeaderboardUsers._items[0].data.total_fibrant_points -
          selectedItem.data.fibrant_points,
        total_proteios_points:
          getLeaderboardUsers._items[0].data.total_proteios_points -
          selectedItem.data.proteios_points,
        total_entries_points:
          getLeaderboardUsers._items[0].data.total_entries_points -
          selectedItem.data.total_entry_points,
      };
      // console.log("updateLeaderboardPoints", updateLeaderboardPoints);
      const updateLeaderboardOptions = {
        dataCollectionId: "leaderboard",
        dataItem: {
          data: updateLeaderboardPoints,
        },
      };
      // console.log(
      //   "getLeaderboardUsers._items[0]._id",
      //   getLeaderboardUsers._items[0]._id,
      // );
      const resLeaderboardUpdate = await myWixClient.items.updateDataItem(
        getLeaderboardUsers._items[0]._id,
        updateLeaderboardOptions,
      );
      updatePoints(resLeaderboardUpdate.dataItem.data.total_entries_points);
      setToastVisible(true);
      setIconType("success");
      setErrorMessage("Entry Deleted Successfully!");
      setTimeout(() => {
        setToastVisible(false);
        setRefresh(!refresh);
      }, 2000);
    } catch (error) {
      console.log("error in handleDeleteEntry", error);
    }
  };

  const options = [
    {
      label: "View",
      onPress: () => {
        navigation.navigate("detailed_entry", { item: selectedItem });
        setModalVisible(!modalVisible);
        setModalIndex(null);
      },
    },
    {
      label: "Edit",
      onPress: () => {
        navigation.navigate("add_data", { item: selectedItem });
        setModalVisible(!modalVisible);
        setModalIndex(null);
      },
    },
    {
      label: "Delete",
      onPress: () => {
        setDeleteModal(true);
        setModalVisible(!modalVisible);
        setModalIndex(null);
      },
      textStyle: { color: "red" },
    },
  ];

  // Render each entry card
  const renderItem = ({ item, index }) => (
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
        <TouchableOpacity onPress={() => handleThreeDotPress(item, index)}>
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

      {/* Modal only opens for the current entry */}
      {modalIndex === index && (
        <CMModal
          options={options}
          isVisible={modalIndex === index}
          modalStyle={{
            position: "absolute",
            right: 40,
            top: 40,
          }}
        />
      )}
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
        renderItem={entriesData.length > 0 ? renderItem : null}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 230,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          // Show a message when the list is empty
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              color: ThemeTextColors.placeholder,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No entries available. Pull down to refresh.
          </Text>
        }
        refreshing={refreshing} // Bind refreshing state to FlatList
        onRefresh={onRefresh} // Handle pull-to-refresh action
      />

      {/* delete confirmation modal */}
      {deleteModal && (
        <CMConfirmationModal
          onCancel={handleCloseModal}
          onConfirm={() => {
            handleDeleteEntry(selectedItem);
            handleCloseModal();
          }}
        />
      )}
      <Toast visible={toastVisible} type={iconType} message={errorMessage} />
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
