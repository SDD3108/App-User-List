import { StyleSheet, Text, View,SafeAreaView,Alert } from 'react-native'
import React, { useState } from 'react'
import AuthSlice from '../store/authSlice'
import { useRoute,useNavigation } from '@react-navigation/native'
import CustomImage from '../shared/image/CustomImage'
import Button from '../shared/button/Button'
import UsersApi from '../store/userSlice'


export default function UserDetailScreen() {
  const {removeUser,users} = UsersApi()
  const {set} = AuthSlice()
  const route = useRoute()
  const navigation = useNavigation()
  const user = users.find((u)=> u.id == route.params.id)

  const toDelete = async(id)=>{
    removeUser(id)
    const updUser = users.filter((u)=>u.id !== id)
    set({users:updUser})
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers))
    navigation.navigate('List')
  }

  if(!user){
    return(
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>User not found</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{user.first_name} {user.last_name}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Email : </Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <CustomImage source={{ uri:user.avatar}}/>
        <Button onPress={()=>toDelete(user.id)} textStyle={{color:'white'}} name='Delete' style={styles.btn}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    width:300,
    height:400,
    borderRadius:24,
    justifyContent:'center',
    alignItems:'center',
    marginTop:60,
    marginLeft:'auto',
    marginRight:'auto',
    borderWidth:1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    // margin:'auto'
  },
  row:{
    width:80,
    flexDirection: "row",
    justifyContent:'center',
    alignItems: "center",
    marginBottom: 4,
    marginLeft:'auto',
    marginRight:'auto',
  },
  label:{
    fontWeight: "bold",
    width: 50,
    textAlign: "left",
  },
  value: {
    width:162,
    textAlign:'left',
    fontSize:14,
    fontWeight:600
  },
  btn:{
    backgroundColor:'#ba0909',
    width:200,
    height:40,
    borderWidth:0,
    paddingHorizontal: 0,
    paddingVertical:0,
    marginTop:20,
  }
})