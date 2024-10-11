import { StyleSheet, Text, View,TextInput  } from "react-native";
import React from "react";
import { ThemeBgColors, ThemeTextColors } from "../theme/theme";
import { HelperText } from "react-native-paper";

const CMInput = ({
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
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputTitle, titleStyle]}>{title}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={ThemeTextColors.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={value ? value : placeholderText}
        editable={editable}
      />
      {error && (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export default CMInput;

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