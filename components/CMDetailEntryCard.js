import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
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

const CMDetailEntryCard = () => {
  const navigation = useNavigation();
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

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  const hanleThreeDotPress = () => {
    setModalVisible(!modalVisible); // Open modal on profile press
  };
  const handleCloseModal = () => {
    setDeleteModal(false);
  };

  // Categories and their respective products
  const categories = [
    {
      categoryName: "Magellan",
      products: [
        { label: "PRP Kit", value: "prpkit" },
        { label: "Mar0 Kit", value: "marokit" },
        { label: "Machine", value: "machine" },
      ],
    },
    {
      categoryName: "Influx",
      products: [
        { label: "Cortical Fibers", value: "corticalFibers" },
        { label: "PLUS Flow", value: "plusFlow" },
        { label: "PLUS Crunch", value: "plusCrunch" },
      ],
    },
  ];

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
      label: "delete",
      onPress: () => {
        setDeleteModal(true);
        setModalVisible(!modalVisible);
      },
      textStyle: { color: "red" },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.EntryTitleIcon}>
          {true ? (
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
        {true && (
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
        )}
        <View style={{ paddingVertical: 12, gap: 5 }}>
          <Text style={styles.fieldTitle}>Hospital/Facility</Text>
          <Text style={styles.fieldValue}>Mayo Clinic - Rochester</Text>
        </View>
        <CMline />
        <View style={{ paddingVertical: 12, gap: 5 }}>
          <Text style={styles.fieldTitle}>First Case Date</Text>
          <Text style={styles.fieldValue}>22/5/2024</Text>
        </View>
        <CMline />
      </View>

      <View style={{ paddingTop: 10 }}>
        <View>
          <Text style={styles.titleHeading}>Product Line</Text>
        </View>

        <View  style={{ paddingTop: 10 }}>
          {/* Dynamically render categories and their products */}
          {categories.map((category) => (
            <View
              key={category.categoryName}
              style={styles.containerSelectCategory}
            >
              <View style={styles.selectorInput}>
                <Text style={styles.selectorTitle}>
                  {category.categoryName}
                </Text>
              </View>

              {/* Render products of each category */}
              {true && (
                <View style={styles.dropDownContainer}>
                  {category.products.map((product, index) => (
                    <View style={{ paddingVertical: 2 }} key={index}>
                      <Text
                        style={{
                          fontFamily: "Jakarta-Sans-Medium",
                          fontSize: 14,
                          color: ThemeTextColors.lightGray,
                        }}
                      >
                        {product.label}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <CMline />
            </View>
          ))}
        </View>
      </View>

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

export default CMDetailEntryCard;

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
  titleHeading: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 21,
    color: ThemeTextColors.darkOrange,
  },
  selectorTitle: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 18,
    color: ThemeTextColors.darkGray1,
  },
  containerSelectCategory: {
    paddingVertical: 5,
  },
  dropDownContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 10,
  },
});