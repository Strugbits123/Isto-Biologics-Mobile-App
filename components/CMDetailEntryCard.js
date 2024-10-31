import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import CMline from "./CMline";
import HospitalIcon from "../Icons/HospitalIcon";
import DoctorIcon from "../Icons/DoctorIcon";
import ThreeDotIcon from "../Icons/ThreeDotIcon";
import CMModal from "./CMModal";
import { useNavigation, useRoute } from "@react-navigation/native";
import CMConfirmationModal from "./CMConfirmationModal";
import { PointsContext } from "./PointsHandler";
import Toast from "./Toast/Toast";
import { myWixClient } from "../utils/createClient";
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

const CMDetailEntryCard = () => {
  const route = useRoute();
  const { item } = route.params;
  const { totalPoints, updatePoints } = useContext(PointsContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [iconType, setIconType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const hanleThreeDotPress = (item) => {
    setSelectedItem(item);
    setModalVisible(!modalVisible);
  };

  const handleCloseModal = () => {
    setDeleteModal(false);
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
        navigation.replace("Bottom_Navigation", {
          screen: "entries",
        });
      }, 1000);
    } catch (error) {
      console.log("error in handleDeleteEntry", error);
    }
  };

  //Options for header dropdown
  const options = [
    {
      label: "Edit",
      onPress: () => {
        navigation.navigate("add_data", { item: selectedItem });
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

  if (!fontsLoaded && !error) {
    return null;
  }

  // Reusable component for rendering a product category
  const renderCategory = (categoryName, products) => {
    return (
      products.length > 0 && (
        <View style={styles.containerSelectCategory}>
          <View style={styles.selectorInput}>
            <Text style={styles.selectorTitle}>{categoryName}</Text>
          </View>

          <View style={styles.dropDownContainer}>
            {products.map((product, index) => (
              <View style={{ paddingVertical: scaleSize(2) }} key={index}>
                <Text style={styles.productText}>{product}</Text>
              </View>
            ))}
          </View>
          <CMline />
        </View>
      )
    );
  };

  return (
    <View style={styles.container}>
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
          onPress={() => hanleThreeDotPress(item)}
        >
          <ThreeDotIcon width={scaleSize(8)} height={scaleSize(20)} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: scaleSize(10) }}>
        {item.data.doctor_firstname && (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTitle}>Doctor First Name</Text>
              <Text style={styles.fieldValue}>
                {item.data.doctor_firstname}
              </Text>
            </View>
            <CMline />
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTitle}>Doctor Last Name</Text>
              <Text style={styles.fieldValue}>{item.data.doctor_lastname}</Text>
            </View>
          </>
        )}

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>Hospital/Facility</Text>
          <Text style={styles.fieldValue}>{item.data.hospital_name}</Text>
        </View>
        <CMline />

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>First Case Date</Text>
          <Text style={styles.fieldValue}>{item.data.first_case_date}</Text>
        </View>
        <CMline />
      </View>

      <View style={{ paddingTop: scaleSize(10) }}>
        <View>
          <Text style={styles.titleHeading}>Product Line</Text>
        </View>
        <View style={{ paddingTop: scaleSize(10) }}>
          {/* Reuse the renderCategory function for each category */}
          {renderCategory("Magellan", item.data.magellan_category)}
          {renderCategory("Influx", item.data.influx_category)}
          {renderCategory("SPARC", item.data.sparc_category)}
          {renderCategory("InQu", item.data.inqu_category)}
          {renderCategory("Fibrant", item.data.fibrant_category)}
          {renderCategory("ProteiOS", item.data.proteios_category)}
        </View>
      </View>
      {/* drop down  modal */}
      {modalVisible && (
        <CMModal
          options={options}
          isVisible={modalVisible}
          modalStyle={{
            position: "absolute",
            right: scaleSize(50),
            top: scaleSize(40),
          }}
        />
      )}
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

export default CMDetailEntryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTextColors.white,
    borderRadius: scaleSize(20),
    width: "100%",
    height: "auto",
    paddingVertical: scaleSize(25),
    paddingHorizontal: scaleSize(30),
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
  fieldContainer: {
    paddingVertical: scaleSize(12),
    gap: scaleSize(5),
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
  titleHeading: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(21),
    color: ThemeTextColors.darkOrange,
  },
  selectorTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(18),
    color: ThemeTextColors.darkGray1,
  },
  containerSelectCategory: {
    paddingVertical: scaleSize(5),
  },
  dropDownContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: scaleSize(10),
    paddingBottom: scaleSize(10),
    backgroundColor: "white",
    width: "100%",
    paddingVertical: scaleSize(10),
  },
  productText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: scaleFontSize(14),
    color: ThemeTextColors.lightGray,
  },
});
