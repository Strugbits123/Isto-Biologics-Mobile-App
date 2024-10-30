import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CMCheckbox from "./CMCheckbox";
import DownArrowIcon from "../Icons/DownArrowIcon";
import CMline from "./CMline";
import { ThemeTextColors } from "../theme/theme";
import { HelperText } from "react-native-paper";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const CMProductLine = ({
  checkboxes,
  onCheckboxChange,
  error,
  errorMessage,
}) => {
  // State to manage which category's products are visible
  const [visibleCategory, setVisibleCategory] = useState(null);

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
    {
      categoryName: "SPARC",
      products: [{ label: "SPARC", value: "sparc" }],
    },
    {
      categoryName: "InQu",
      products: [
        { label: "Granules", value: "granules" },
        { label: "PMP", value: "pmp" },
        { label: "Matrix", value: "matrix" },
      ],
    },
    {
      categoryName: "Fibrant",
      products: [
        { label: "Anchor", value: "anchor" },
        { label: "Pak", value: "pak" },
        { label: "Bullet", value: "bullet" },
        { label: "Liberty", value: "liberty" },
        { label: "Wrap", value: "wrap" },
        { label: "Strip", value: "strip" },
        { label: "Boat", value: "boat" },
      ],
    },
    {
      categoryName: "ProteiOS",
      products: [{ label: "ProteiOS", value: "proteios" }],
    },
  ];

  let [fontsLoaded, errorFonts] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_600SemiBold,
  });

  const toggleDropdown = (categoryName) => {
    // Toggle the dropdown visibility
    setVisibleCategory(visibleCategory === categoryName ? null : categoryName);
  };

  // useEffect(() => {
  //   if (fontsLoaded || errorFonts) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, errorFonts]);

  if (!fontsLoaded && !errorFonts) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleHeading}>Product Line</Text>
      {/* Display error message if validation fails */}
      {error && (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      )}

      {/* Dynamically render categories and their products */}
      {categories.map((category) => (
        <View
          key={category.categoryName}
          style={styles.containerSelectCategory}
        >
          <View style={styles.selectorInput}>
            <Text style={styles.selectorTitle}>{category.categoryName}</Text>
            <TouchableOpacity
              onPress={() => toggleDropdown(category.categoryName)}
            >
              <DownArrowIcon width={13} height={12} />
            </TouchableOpacity>
          </View>

          {/* Render checkboxes for the products if the category is visible */}
          {visibleCategory === category.categoryName && (
            <View style={styles.dropDownContainer}>
              {category.products.map((product) => (
                <CMCheckbox
                  key={product.value}
                  value={
                    checkboxes[category.categoryName]?.includes(
                      product.value,
                    ) || false
                  }
                  onValueChange={() =>
                    onCheckboxChange(category.categoryName, product.value)
                  }
                  lable={product.label}
                  checkoxStyle={{ borderColor: ThemeTextColors.gray1 }}
                  lableStyle={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: ThemeTextColors.gray1,
                  }}
                />
              ))}
            </View>
          )}

          <CMline />
        </View>
      ))}
    </View>
  );
};

export default CMProductLine;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  titleHeading: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 21,
    color: ThemeTextColors.darkOrange,
  },
  containerSelectCategory: {
    padding: 0,
  },
  dropDownContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    width: "100%",
  },
  selectorInput: {
    paddingHorizontal: 2,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  selectorTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    color: ThemeTextColors.darkGray1,
  },
});
