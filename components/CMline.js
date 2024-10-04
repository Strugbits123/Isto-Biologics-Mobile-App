import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemeTextColors } from '../theme/theme'

const CMline = () => {
  return (
    <View style={styles.container}>
    </View>
  )
}

export default CMline

const styles = StyleSheet.create({
    container:{
        backgroundColor:ThemeTextColors.lineColor,
        height:1,
        width:"100%"
    }
})