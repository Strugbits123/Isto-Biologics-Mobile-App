import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import React, { useState, useRef  } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import CalenderIcon from "../Icons/CalenderIcon";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HelperText } from "react-native-paper";
import {
  useFonts,
  PlusJakartaSans_400Regular,
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

const CMDateInput = ({
  title,
  titleStyle,
  value,
  inputStyle,
  onChange,
  placeholderText,
  error,
  errorMessage,
  editable = true,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  let [fontsLoaded, errorFonts] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });
  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate.toDateString()); // Formatting the date as per your needs
    }
  };

  const showDatePicker = () => {
    if (editable) {
      setShowPicker(true);
    }
  };

  if (!fontsLoaded && !errorFonts) {
    return null;
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputTitle, titleStyle]}>{title}</Text>
      <TouchableOpacity
        onPress={showDatePicker}
        style={{ justifyContent: "center", alignItems: "flex-end" }}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          value={value ? value : date.toDateString()}
          placeholderTextColor={ThemeTextColors.placeholder}
          editable={false} // Disable manual editing, date is picked via picker
        />
        <View style={{ position: "absolute", paddingHorizontal: scaleSize(17) }}>
          <CalenderIcon width={scaleSize(19)} height={scaleSize(19)} />
        </View>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {error && (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export default CMDateInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: scaleSize(10),
  },
  input: {
    fontFamily: "PlusJakartaSans_400Regular",
    minWidth: "100%",
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(8),
    borderColor: "#E8ECF4",
    borderWidth: scaleSize(1),
    fontSize: scaleFontSize(14),
    borderRadius: scaleSize(8),
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
  },
  inputTitle: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.darkGray1,
    marginBottom: scaleSize(10),
  },
});
