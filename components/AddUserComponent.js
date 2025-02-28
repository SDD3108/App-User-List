import { StyleSheet, Text, View,SafeAreaView,Alert } from 'react-native'
import React,{ useState,useEffect } from 'react'
import Input from '../shared/input/Input'
import Button from '../shared/button/Button'
import UsersApi from '../store/userSlice'
import AuthSlice from '../store/authSlice'

export default function AddUserComponent({navigation}) {
  const { addUser } = UsersApi()
  const { users,set } = AuthSlice()
  
  const[first_name,setFirstName] = useState('')
  const[last_name,setLastName] = useState('')
  const[email,setEmail] = useState('')
  const[avatar,setAvatar] = useState('')

  const trueEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return email.length >= 8 && regex.test(email)
  }
  const trueAvatar = (avatar) => {
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i
    return regex.test(avatar)
  }
  const toAddUser =()=>{
    if(!trueEmail(email)){
      Alert.alert('error', 'неправильная почта')
      return
    }
    if(!trueAvatar(avatar)){
      Alert.alert('аватар должен быть ссылкой на изображение','(jpg, png, gif, svg, webp)')
      setAvatar('https://reqres.in/img/faces/1-image.jpg')
      return
    }
    const isUserHas = users.some(user => (user.last_name == last_name && user.email == email && user.first_name == first_name))
    if(isUserHas){
      Alert.alert('error', 'такой пользователь уже существует')
      return
    }
    const newUser = {
      id: Date.now(),
      first_name: first_name,
      last_name: last_name,
      email: email,
      avatar: avatar,
    }
    addUser(newUser)
    navigation.navigate('List')

    setFirstName('')
    setLastName('')
    setEmail('')
    setAvatar('')
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>AddUser</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Input onChangeText={setFirstName} value={first_name} placeholder='First Name' style={styles.input}/>
            <Input onChangeText={setLastName} value={last_name} placeholder='Last Name' style={styles.input}/>
            <Input onChangeText={setEmail} value={email} placeholder='Email' style={styles.input}/>
            <Input onChangeText={setAvatar} value={avatar} placeholder='Avatar' style={styles.input}/>
          </View>
          <View style={styles.btnContainer}>
            <Button onPress={toAddUser} name='Add User' textStyle={{fontSize:24,fontWeight:'700'}} style={styles.btn}/>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    height:450,
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:120,
    // borderWidth:2,
    // borderRadius:24
  },
  titleContainer:{
    justifyContent:'center',
    alignItems:'center',
    // borderWidth:2,
  },
  title:{
    width:350,
    fontSize: 54,
    fontWeight:'800',
    textAlign:'left'
  },
  container:{
    width:400,
    // borderWidth:2,
    marginTop:10,
  },
  inputContainer:{
    justifyContent:'center',
    alignItems:'center',
    gap:6,
    
  },
  btnContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:12,
  },
  input:{
    width:350,
  },
  btn:{
    width:350,
  },
})