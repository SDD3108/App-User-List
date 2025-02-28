import { StyleSheet, Text, View,SafeAreaView,Alert } from 'react-native'
import React,{useState} from 'react'
import Input from '../shared/input/Input'
import Button from '../shared/button/Button'
import AuthSlice from '../store/authSlice'

export default function LoginScreen({navigation}) {
  const [last_name,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {login,currentUser} = AuthSlice()

  const toLogin = async()=>{
    await login({last_name,email,password})
    const updUser = AuthSlice.getState().currentUser
    if(updUser){
      navigation.navigate('List')
      setLastName('')
      setEmail('')
      setPassword('')
    }
    else{
      Alert.alert('Error','not correct datas')
    }
  }

  return (
    <SafeAreaView style={styles.login}>
      <View style={{width:350,marginLeft:'auto',marginRight:'auto'}}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input style={styles.input} onChangeText={setLastName} value={last_name} placeholder='Last Name'/>
          <Input style={styles.input} onChangeText={setEmail} value={email} placeholder='Email'/>
          <Input style={styles.input} secureTextEntry onChangeText={setPassword} value={password} placeholder='Password'/>
        </View>
        <View style={styles.btnContainer}>
          <Button name='Log In' onPress={toLogin} style={styles.btn} />
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Don't have an account? <Text onPress={()=>navigation.navigate('Registration')} style={[styles.accountText,styles.createAccount]} >Create now!</Text></Text>
        </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  login:{
    width:400,
    height:550,
    borderWidth:2,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:120,
    borderRadius:24,
    justifyContent:'center',
    // alignItems:'center',
    // padding:20,
  },
  title:{
    fontSize:54,
    fontWeight:800,
    textAlign:'left',
  },
  container:{
    marginTop:10,
  },
  inputContainer:{
    justifyContent:'center',
    alignItems:'center',
    gap:6,
  },
  input:{
    width:350,
    height:50,
  },
  btnContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:12,
  },
  btn:{
    width:350,
    // height:40,
    // paddingHorizontal: 0,
    // paddingVertical:0,
  },
  accountContainer:{
    marginTop:3,
  },
  accountText:{
    fontSize:18,
    fontWeight:500,
    color:'black',
    textAlign:'center'
  },
  createAccount:{
    textDecorationLine:'underline',
    textDecorationColor:'orange',
  }
})