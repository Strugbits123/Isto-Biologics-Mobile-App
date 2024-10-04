import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import {  Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator/LoadingIndicator';
import CMLoader from './CMLoader';
const CMModal = ({ options, modalStyle }) => {
    const [fontsLoaded] = useFonts({
        "Jakarta-Sans-Medium": require("../assets/fonts/static/PlusJakartaSans-Medium.ttf"),
      });
    
      if (!fontsLoaded) {
        return <CMLoader size={20} />;
      }
  return (
        <View style={[styles.modalContent , modalStyle]}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} onPress={option.onPress}>
              <Text style={[styles.modalText, option.textStyle]}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
  );
};

export default CMModal


const styles = StyleSheet.create({
    modalContent: {
      backgroundColor: 'white',
      padding: 2,
      borderRadius: 10,
      justifyContent:"center",
      maxWidth:90,
    },
    modalText: {
        fontFamily:"Jakarta-Sans-Medium",
      fontSize: 14,
      paddingHorizontal:10,
      paddingVertical:5
    },
  });

