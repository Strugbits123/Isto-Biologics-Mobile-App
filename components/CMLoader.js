import { ActivityIndicator, View } from "react-native";
import React from "react";

const CMLoader = ({ size, color }) => {
  return (
    <View>
      <ActivityIndicator size={size} color={color || "#EE4C22"} />
    </View>
  );
};

export default CMLoader;
