import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ThemeBgColors } from '../../theme/theme'
import CMButton from '../../components/CMButton'
import CMToast from '../../components/CMToast'

const DocsScreen = () => {
  
  return (
    <View style={styles.mainContainer}>
    <Text style={{fontSize:15}}>Docs</Text>
  </View>
  )
}

export default DocsScreen

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1,
    justifyContent:"center",
     alignItems:"center",
    backgroundColor: ThemeBgColors.mainBg,
  },
})