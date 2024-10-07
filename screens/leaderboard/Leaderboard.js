import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemeBgColors } from '../../theme/theme'
import CMProductLine from '../../components/CMProductLine'

const Leaderboard = () => {
  return (
    <View style={styles.mainContainer}>
    <Text>Leaderboard</Text>
  </View>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1,
    justifyContent:"center",
     alignItems:"center",
    backgroundColor: ThemeBgColors.mainBg,
  },
})