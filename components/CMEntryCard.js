import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import CMLoader from "./CMLoader";
import CMline from "./CMline";
import HospitalIcon from "../Icons/HospitalIcon";
import DoctorIcon from "../Icons/DoctorIcon";
import ThreeDotIcon from "../Icons/ThreeDotIcon";
import CMModal from "./CMModal";
import { useNavigation } from "@react-navigation/native";
import CMConfirmationModal from "./CMConfirmationModal";
import { myWixClient } from "../utils/createClient";
import { PointsContext } from "./PointsHandler";
import { CurrentMemberContext } from "./CurrentMemberHandler";
import Toast from "./Toast/Toast";
import {
  useFonts,
  PlusJakartaSans_700Bold,
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

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_600SemiBold,
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
      // get leaderboard data for subtract points
      const getLeaderboardUsers = await myWixClient.items
        .queryDataItems(leaderboardOptions)
        .eq("user_id", selectedItem.data.user_id._id)
        .find();
      // console.log("selectedItem.data", selectedItem.data);
      // console.log("getLeaderboardUsers", getLeaderboardUsers.items[0].data);

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
        total_hospital_points:
          getLeaderboardUsers._items[0].data.total_hospital_points -
          selectedItem.data.hospital_points,
        total_doctor_points:
          getLeaderboardUsers._items[0].data.total_doctor_points -
          selectedItem.data.doctor_points,
        total_products_points:
          getLeaderboardUsers._items[0].data.total_products_points -
          selectedItem.data.products_points,
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
      updatePoints({
        total_leaderboard_points:
          resLeaderboardUpdate.dataItem.data.total_entries_points,
        total_doctor_points:
          resLeaderboardUpdate.dataItem.data.total_doctor_points,
        total_hospital_points:
          resLeaderboardUpdate.dataItem.data.total_hospital_points,
        total_products_points:
          resLeaderboardUpdate.dataItem.data.total_products_points,
      });
      // updatePoints(resLeaderboardUpdate.dataItem.data.total_entries_points);
      setToastVisible(true);
      setIconType("success");
      setErrorMessage("Entry Deleted Successfully!");
      setTimeout(() => {
        setToastVisible(false);
        setRefresh(!refresh);
      }, 1000);
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

  if (!fontsLoaded && !error) {
    return null;
  }
  // Render each entry card
  const renderItem = ({ item, index }) => (
    <Pressable  onPress={() => handleThreeDotPress(item, index)} style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.EntryTitleIcon}>
          {item.data.doctor_firstname ? (
            <>
              <DoctorIcon width={scaleSize(40)} height={scaleSize(40)} />
              <Text style={styles.EntryTitleText}>Doctor</Text>
            </>
          ) : (
            <>
              <HospitalIcon width={scaleSize(40)} height={scaleSize(40)} />
              <Text style={styles.EntryTitleText}>Hospital/Facility</Text>
            </>
          )}
        </View>
        <TouchableOpacity
          style={{
            width: scaleSize(30), // Adjust to be slightly larger than icon width
            height: scaleSize(30), // Adjust to be slightly larger than icon height
            borderRadius: scaleSize(30), // Half of the width/height for a fully rounded shape
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleThreeDotPress(item, index)}
        >
          <ThreeDotIcon width={scaleSize(8)} height={scaleSize(20)} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: scaleSize(10) }}>
        {item.data.doctor_firstname ? (
          <>
            <View style={{ paddingVertical: scaleSize(12), gap: scaleSize(5) }}>
              <Text style={styles.fieldTitle}>Doctor First Name</Text>
              <Text style={styles.fieldValue}>
                {item.data.doctor_firstname}
              </Text>
            </View>
            <CMline />
            <View style={{ paddingVertical: scaleSize(12), gap: scaleSize(5) }}>
              <Text style={styles.fieldTitle}>Doctor Last Name</Text>
              <Text style={styles.fieldValue}>{item.data.doctor_lastname}</Text>
            </View>
          </>
        ) : (
          <View style={{ paddingVertical: scaleSize(12), gap: scaleSize(5) }}>
            <Text style={styles.fieldTitle}>Hospital/Facility</Text>
            <Text style={styles.fieldValue}>{item.data.hospital_name}</Text>
          </View>
        )}

        <CMline />
        <View style={{ paddingVertical: scaleSize(12), gap: scaleSize(5) }}>
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
            right: scaleSize(50),
            top: scaleSize(40),
          }}
        />
      )}
    </Pressable>
  );

  return isLoading ? (
    <View style={{ top: scaleSize(100) }}>
      <CMLoader size={scaleSize(50)} />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={entriesData}
        renderItem={entriesData.length > 0 ? renderItem : null}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: scaleSize(230),
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          // Show a message when the list is empty
          <Text
            style={{
              flex: 1,
              fontSize: scaleFontSize(16),
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
    borderRadius: scaleSize(20),
    width: "100%",
    height: "auto",
  },
  cardContainer: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: scaleSize(20),
    width: "100%",
    height: "auto",
    paddingVertical: scaleSize(25),
    paddingHorizontal: scaleSize(30),
    marginVertical: scaleSize(10),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  EntryTitleIcon: {
    flexDirection: "row",
    gap: scaleSize(10),
    alignItems: "center",
  },
  EntryTitleText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(21),
    color: ThemeTextColors.darkGray1,
  },
  fieldTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.darkGray1,
  },
  fieldValue: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(14),
    color: ThemeTextColors.placeholder,
  },
});
