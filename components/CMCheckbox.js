import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { ThemeTextColors } from "../theme/theme";

const CMCheckbox = ({ value, checkoxStyle, lable, onValueChange, lableStyle }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        style={[styles.checkbox, checkoxStyle]}
        color={value ? ThemeTextColors.darkOrange : undefined}
      />
      <Text style={[styles.checkboxlabel, lableStyle]}>{lable}</Text>
    </View>
  );
};

export default CMCheckbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: 5,
  },
  checkbox: {
    alignSelf: "center",
    width: 13,
    height: 13,
    borderColor: ThemeTextColors.orange,
  },
  checkboxlabel: {
    paddingHorizontal: 8,
    paddingBottom: 4,
    fontFamily: "Jakarta-Sans-Medium",
    fontSize: 17,
    color: ThemeTextColors.darkGray1,
    justifyContent: "center",
    alignItems: "center",
  },
});
