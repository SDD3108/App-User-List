import { create } from 'zustand';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // пришлось скачивать и читать непонятную документацию изза того что асинк функции тут не работают без него почемуто и данные загружались при каждом ререндере
import axios from 'axios';
import UsersApi from './userSlice';

const AuthSlice = create((set, get)=>({
    users: [],
    currentUser: null,
    loadUsers: async () => {
      const savedUsers = await AsyncStorage.getItem('users')
      if(savedUsers){
        const parsedUsers = JSON.parse(savedUsers)
        // users = JSON.parse(savedUsers)
        set({ users: parsedUsers})
        UsersApi.setState((state) => ({users: [...state.users, ...parsedUsers],}))

      }
      else{
        const response = await axios.get('https://reqres.in/api/users')
        const users = response.data.data
        await AsyncStorage.setItem('users', JSON.stringify(users))
        set({ users })
        // set({users:[]})
      }
      
    },
    register:async(userData)=>{
      const {first_name, last_name, email, avatar,password } = userData
      if(!first_name || !last_name || !email || !avatar || !password){
        Alert.alert('заполните все поля')
        return
      }
      const newUser = {
            id: Date.now(),
            first_name: first_name,
            last_name: last_name,
            email: email,
            avatar: avatar,
            password: password,
      }
      const updatedUsers = [...get().users, newUser]
      await AsyncStorage.setItem('users',JSON.stringify(updatedUsers))
      set({users:updatedUsers})
      UsersApi.setState((state) => ({users: [...state.users, newUser],}))
      // set((state) =>({ users: [...state.users, newUser] }))
      Alert.alert('Succes', 'регистрация прошла успешно')
    },
    login: async (loginData)=>{
      const { last_name, email, password } = loginData
      if(!last_name || !email || !password){
        Alert.alert('заполните все поля')
        return
      }
      if(get().users.length == 0){
        await get().loadUsers()
      }
      const users = get().users
      const user = users.find(
        (u) => u.last_name == last_name && u.email == email && u.password == password
      )
      if(user){
        await AsyncStorage.setItem('currentUser', JSON.stringify(user))
        set({ currentUser: user })
      }
      else{
        Alert.alert('данные неправильные')
      }
    },
    logout: async()=>{
      await AsyncStorage.removeItem('currentUser')
      set({ currentUser: null })
    },
}))

export default AuthSlice