import { StyleSheet, Text, View,TouchableOpacity  } from 'react-native'
import React from 'react'

export default function Button({textStyle,style,name, ...props}) {
  return (
    <TouchableOpacity style={[styles.button,style]} {...props}>
      <Text style={[styles.text,textStyle]}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
      width:'100%',
      backgroundColor: 'black',
      color: 'white',
      // backgroundColor:'white',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingVertical:20,
      borderRadius:12,
      textAlign:'center',
      fontSize: 18,
      borderWidth:2,
    },
    text:{
      color: 'white',
      fontSize:20,
      fontWeight:600,
    }
})