// import { StyleSheet, Text, View, TextInput } from "react-native";
// import React from "react";
// import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
// import CalenderIcon from "../Icons/CalenderIcon";

// const CMDateInput = ({
//   title,
//   titleStyle,
//   value,
//   inputStyle,
//   onChange,
//   placeholderText,
//   error,
//   errorMessage,
//   editable = true,
// }) => {
//   return (
//     <View style={styles.inputContainer}>
//       <Text style={[styles.inputTitle, titleStyle]}>{title}</Text>
//       <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
//         <TextInput
//           style={[styles.input, inputStyle]}
//           value={value}
//           onChangeText={onChange}
//           placeholderTextColor={ThemeTextColors.placeholder}
//           autoCorrect={false}
//           autoCapitalize="none"
//           placeholder={value ? value : placeholderText}
//           editable={editable}
//         />
//         <View style={{ position: "absolute", paddingHorizontal: 17 }}>
//           <CalenderIcon width={19} height={19} />
//         </View>
//       </View>
//       {error && (
//         <HelperText type="error" visible={error}>
//           {errorMessage}
//         </HelperText>
//       )}
//     </View>
//   );
// };

// export default CMDateInput;

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginTop: 10,
//   },
//   input: {
//     fontFamily: "Jakarta-Sans",
//     minWidth: "100%",
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderColor: "#E8ECF4",
//     borderWidth: 1,
//     fontSize: 14,
//     borderRadius: 8,
//     backgroundColor: ThemeBgColors.lightGrayPlaceholders,
//   },
//   inputTitle: {
//     fontFamily: "Jakarta-Sans-Semi-bold",
//     fontSize: 16,
//     color: ThemeTextColors.darkGray1,
//     marginBottom: 10,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import CalenderIcon from "../Icons/CalenderIcon";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HelperText } from "react-native-paper";

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
        <View style={{ position: "absolute", paddingHorizontal: 17 }}>
          <CalenderIcon width={19} height={19} />
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
    marginTop: 10,
  },
  input: {
    fontFamily: "Jakarta-Sans",
    minWidth: "100%",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: "#E8ECF4",
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: ThemeBgColors.lightGrayPlaceholders,
  },
  inputTitle: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 16,
    color: ThemeTextColors.darkGray1,
    marginBottom: 10,
  },
});
