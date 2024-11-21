import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import CMCheckbox from "./CMCheckbox";
import DownArrowIcon from "../Icons/DownArrowIcon";
import CMline from "./CMline";
import { ThemeTextColors } from "../theme/theme";
import { HelperText } from "react-native-paper";
import {
  useFonts,
  PlusJakartaSans_400Regular,
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
          <Pressable
            onPress={() => toggleDropdown(category.categoryName)}
            style={styles.selectorInput}
          >
            <Text style={styles.selectorTitle}>{category.categoryName}</Text>
            <TouchableOpacity
              onPress={() => toggleDropdown(category.categoryName)}
            >
              <DownArrowIcon width={scaleSize(13)} height={scaleSize(12)} />
            </TouchableOpacity>
          </Pressable>

          {/* Render checkboxes for the products if the category is visible */}
          {visibleCategory === category.categoryName && (
            <View style={styles.dropDownContainer}>
              {category.products.map((product) => (
                <Pressable
                  onPress={() =>
                    onCheckboxChange(category.categoryName, product.value)
                  }
                >
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
                      fontSize: scaleFontSize(14),
                      color: ThemeTextColors.gray1,
                    }}
                  />
                </Pressable>
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
    marginVertical: scaleSize(20),
    paddingHorizontal: scaleSize(5),
  },
  titleHeading: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(21),
    color: ThemeTextColors.darkOrange,
  },
  containerSelectCategory: {
    padding: scaleSize(0),
  },
  dropDownContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: scaleSize(10),
    paddingBottom: scaleSize(10),
    backgroundColor: "white",
    width: "100%",
  },
  selectorInput: {
    paddingHorizontal: scaleSize(2),
    paddingVertical: scaleSize(12),
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  selectorTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(18),
    color: ThemeTextColors.darkGray1,
  },
});
