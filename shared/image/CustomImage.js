import { StyleSheet, Text, View,Image  } from 'react-native'
import React from 'react'

export default function CustomImage({source,style}) {
  return (
    <Image source={source} alt='no' style={[styles.image,style]} />
  )
}

const styles = StyleSheet.create({
    image:{
        width:200,
        height:200,
        borderRadius:8,
    }
})