import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
 
export default function Input({style, ...props}) {
  return (
    <View>
      <TextInput style={[styles.input,style]} {...props}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
      width: '100%',
      backgroundColor: 'white',
      height:40,
      borderRadius:12,
      borderWidth:2,
      borderColor: 'black',
      color: 'black',
      paddingHorizontal: 20,
      fontSize: 16,
      fontWeight:600,
    }
})