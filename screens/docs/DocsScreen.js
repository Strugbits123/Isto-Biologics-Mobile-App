import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemeBgColors } from '../../theme/theme'

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