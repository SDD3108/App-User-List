import { StyleSheet, Text, View,SafeAreaView,Alert } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import Input from '../shared/input/Input';
import Button from '../shared/button/Button';
import AuthSlice from '../store/authSlice';
import UsersApi from '../store/userSlice';

export default function RegistrationScreen({ navigation }) {
  const { register } = AuthSlice()
  const { users } = UsersApi()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [password,setPassword] = useState('')
  const truePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/
    return regex.test(password)
  }
  const trueEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return email.length >= 8 && regex.test(email)
  }
  const trueAvatar = (avatar) => {
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i
    return regex.test(avatar)
  }
  const toRegistration =()=>{
    if(!trueEmail(email)){
      Alert.alert('некорректная почта')
      return
    }
    if(!truePassword(password)){
      Alert.alert('gароль должен содержать минимум 9 символов, включая заглавную и строчную букву, цифру и специальный символ')
      return
    }
    if(!trueAvatar(avatar)){
      Alert.alert('аватар должен быть ссылкой на изображение','(jpg, png, gif, svg, webp)','сейчас по дефолту будет стоять наша картинка')
      setAvatar('https://reqres.in/img/faces/1-image.jpg')
      return
    }
    const isUserHas = users.some((user)=> user.first_name == first_name && user.last_name == last_name && user.email == email && (!user.password || user.password == password))
    if(isUserHas){
      Alert.alert('Error', 'такой пользователь уже существует')
      return
    }
    // console.log(firstName,lastName,email,password);
    register({first_name, last_name, email, avatar,password })
    navigation.navigate('Login')
    setFirstName('')
    setLastName('')
    setEmail('')
    setAvatar('')
    setPassword('')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:350,marginLeft:'auto',marginRight:'auto'}}>
        <Text style={styles.title}>Registration</Text>
        <View style={styles.mainContainer}>
          <Input placeholder='Name' style={styles.input} value={first_name} onChangeText={setFirstName}/>
          <Input placeholder='Last Name' style={styles.input} value={last_name} onChangeText={setLastName} />
          <Input placeholder='Avatar' style={styles.input} value={avatar} onChangeText={setAvatar} />
          <Input placeholder='Email' style={styles.input} value={email} onChangeText={setEmail} />
          <Input  secureTextEntry placeholder='Password' style={styles.input} value={password} onChangeText={setPassword} />
          <Button style={styles.btn} onPress={toRegistration} name='Create Account'/>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Do you already have an account? <Text onPress={()=>navigation.navigate('Login')} style={[styles.accountText,styles.createAccount]} >Log in.</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    width:400,
    borderWidth:2,
    borderRadius:24,
    height:550,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:120,
    justifyContent:'center',
    alignItems:'center',
  },
  input:{
    width:350,
    marginTop:6,
  },
  btn:{
    width:350,
    marginTop:12,
  },
  title:{
    fontSize:54,
    fontWeight:800,
  },
  mainContainer:{
    marginTop:10,
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
  },
})