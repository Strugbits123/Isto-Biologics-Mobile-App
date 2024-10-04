import {ActivityIndicator} from 'react-native';
import React from 'react';

const CMLoader = ({size, color}) => {
  return (
   <ActivityIndicator size={size} color={color || "#EE4C22"}/>
  );
};

export default CMLoader;