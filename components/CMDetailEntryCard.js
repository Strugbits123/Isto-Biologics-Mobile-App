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
import { useNavigation, useRoute } from "@react-navigation/native";
import CMConfirmationModal from "./CMConfirmationModal";

const CMDetailEntryCard = () => {
  const route = useRoute();
  const { item } = route.params;

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

  console.log("itemData", item.data);

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
        <TouchableOpacity onPress={hanleThreeDotPress}>
          <ThreeDotIcon width={8} height={20} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 10 }}>
        {item.data.doctor_firstname && (
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
              <Text style={styles.fieldValue}>
                {item.data.doctor_firstname}
              </Text>
            </View>
          </>
        )}
        <View style={{ paddingVertical: 12, gap: 5 }}>
          <Text style={styles.fieldTitle}>Hospital/Facility</Text>
          <Text style={styles.fieldValue}>{item.data.hospital_name}</Text>
        </View>
        <CMline />
        <View style={{ paddingVertical: 12, gap: 5 }}>
          <Text style={styles.fieldTitle}>First Case Date</Text>
          <Text style={styles.fieldValue}>{item.data.first_case_date}</Text>
        </View>
        <CMline />
      </View>

      <View style={{ paddingTop: 10 }}>
        <View>
          <Text style={styles.titleHeading}>Product Line</Text>
        </View>

        <View style={{ paddingTop: 10 }}>
          {/* Dynamically render categories and their products */}
          {item.data.magellan_category.length > 0 && (
            <View style={styles.containerSelectCategory}>
              <View style={styles.selectorInput}>
                <Text style={styles.selectorTitle}>Magellan</Text>
              </View>

              {/* Render products of each category */}
              {item.data.magellan_category && (
                <View style={styles.dropDownContainer}>
                  {item.data.magellan_category.map((product, index) => (
                    <View style={{ paddingVertical: 2 }} key={index}>
                      <Text
                        style={{
                          fontFamily: "Jakarta-Sans-Medium",
                          fontSize: 14,
                          color: ThemeTextColors.lightGray,
                        }}
                      >
                        {product}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <CMline />
            </View>
          )}
          {item.data.influx_category.length > 0 && (
            <View style={styles.containerSelectCategory}>
              <View style={styles.selectorInput}>
                <Text style={styles.selectorTitle}>Influx</Text>
              </View>

              {/* Render products of each category */}
              {item.data.influx_category && (
                <View style={styles.dropDownContainer}>
                  {item.data.influx_category.map((product, index) => (
                    <View style={{ paddingVertical: 2 }} key={index}>
                      <Text
                        style={{
                          fontFamily: "Jakarta-Sans-Medium",
                          fontSize: 14,
                          color: ThemeTextColors.lightGray,
                        }}
                      >
                        {product}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <CMline />
            </View>
          )}
          {item.data.sparc_category.length > 0 && (
            <View style={styles.containerSelectCategory}>
              <View style={styles.selectorInput}>
                <Text style={styles.selectorTitle}>SPARC</Text>
              </View>

              {/* Render products of each category */}
              {item.data.sparc_category && (
                <View style={styles.dropDownContainer}>
                  {item.data.sparc_category.map((product, index) => (
                    <View style={{ paddingVertical: 2 }} key={index}>
                      <Text
                        style={{
                          fontFamily: "Jakarta-Sans-Medium",
                          fontSize: 14,
                          color: ThemeTextColors.lightGray,
                        }}
                      >
                        {product}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <CMline />
            </View>
          )}
          {item.data.inqu_category.length > 0 && (
            <View style={styles.containerSelectCategory}>
              <View style={styles.selectorInput}>
                <Text style={styles.selectorTitle}>InQu</Text>
              </View>

              {/* Render products of each category */}
              {item.data.inqu_category && (
                <View style={styles.dropDownContainer}>
                  {item.data.inqu_category.map((product, index) => (
                    <View style={{ paddingVertical: 2 }} key={index}>
                      <Text
                        style={{
                          fontFamily: "Jakarta-Sans-Medium",
                          fontSize: 14,
                          color: ThemeTextColors.lightGray,
                        }}
                      >
                        {product}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <CMline />
            </View>
          )}
          {item.data.fibrant_category.length > 0 && (
            <View style={styles.containerSelectCategory}>
              <View style={styles.selectorInput}>
                <Text style={styles.selectorTitle}>Fibrant</Text>
              </View>

              {/* Render products of each category */}
              {item.data.fibrant_category && (
                <View style={styles.dropDownContainer}>
                  {item.data.fibrant_category.map((product, index) => (
                    <View style={{ paddingVertical: 2 }} key={index}>
                      <Text
                        style={{
                          fontFamily: "Jakarta-Sans-Medium",
                          fontSize: 14,
                          color: ThemeTextColors.lightGray,
                        }}
                      >
                        {product}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <CMline />
            </View>
          )}
          {item.data.proteios_category.length > 0 && (
            <View style={styles.containerSelectCategory}>
              <View style={styles.selectorInput}>
                <Text style={styles.selectorTitle}>ProteiOS</Text>
              </View>

              {/* Render products of each category */}
              {item.data.proteios_category && (
                <View style={styles.dropDownContainer}>
                  {item.data.proteios_category.map((product, index) => (
                    <View style={{ paddingVertical: 2 }} key={index}>
                      <Text
                        style={{
                          fontFamily: "Jakarta-Sans-Medium",
                          fontSize: 14,
                          color: ThemeTextColors.lightGray,
                        }}
                      >
                        {product}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <CMline />
            </View>
          )}
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
