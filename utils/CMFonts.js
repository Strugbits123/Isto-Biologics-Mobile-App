// src/theme/fonts.js
import { Platform } from "react-native";

// Define font family names with platform-specific options
const CMFonts = {
  extraLight: Platform.select({
    android: "PlusJakartaSans_200ExtraLight",
    ios: "PlusJakartaSans-ExtraLight",
  }),
  light: Platform.select({
    android: "PlusJakartaSans_300Light",
    ios: "PlusJakartaSans-Light",
  }),
  regular: Platform.select({
    android: "PlusJakartaSans_400Regular",
    ios: "PlusJakartaSans-Regular",
  }),
  medium: Platform.select({
    android: "PlusJakartaSans_500Medium",
    ios: "PlusJakartaSans-Medium",
  }),
  semiBold: Platform.select({
    android: "PlusJakartaSans_600SemiBold",
    ios: "PlusJakartaSans-SemiBold",
  }),
  bold: Platform.select({
    android: "PlusJakartaSans_700Bold",
    ios: "PlusJakartaSans-Bold",
  }),
  extraBold: Platform.select({
    android: "PlusJakartaSans_800ExtraBold",
    ios: "PlusJakartaSans-ExtraBold",
  }),
  extraLightItalic: Platform.select({
    android: "PlusJakartaSans_200ExtraLight_Italic",
    ios: "PlusJakartaSans-ExtraLightItalic",
  }),
  lightItalic: Platform.select({
    android: "PlusJakartaSans_300Light_Italic",
    ios: "PlusJakartaSans-LightItalic",
  }),
  regularItalic: Platform.select({
    android: "PlusJakartaSans_400Regular_Italic",
    ios: "PlusJakartaSans-RegularItalic",
  }),
  mediumItalic: Platform.select({
    android: "PlusJakartaSans_500Medium_Italic",
    ios: "PlusJakartaSans-MediumItalic",
  }),
  semiBoldItalic: Platform.select({
    android: "PlusJakartaSans_600SemiBold_Italic",
    ios: "PlusJakartaSans-SemiBoldItalic",
  }),
  boldItalic: Platform.select({
    android: "PlusJakartaSans_700Bold_Italic",
    ios: "PlusJakartaSans-BoldItalic",
  }),
  extraBoldItalic: Platform.select({
    android: "PlusJakartaSans_800ExtraBold_Italic",
    ios: "PlusJakartaSans-ExtraBoldItalic",
  }),
};

export default CMFonts;
