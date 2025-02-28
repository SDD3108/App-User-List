import { create } from 'zustand';
import axios from 'axios';
import AuthSlice from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersApi = create((set,get) => ({
  users: [],
  fetchUsers: async ()=>{
    const response = await axios.get('https://reqres.in/api/users')
    const apiUsers = response.data.data
    const storedUsers = AuthSlice.getState().users || []
    set({ users: [...apiUsers, ...storedUsers] })
  },
  addUser: async(user) => {
    set((state) => {
      const updatedUsers = [...state.users, user]
      AsyncStorage.setItem('users',JSON.stringify(updatedUsers))
      return {users:updatedUsers}
    })
    
  },
  removeUser: async(id) => {
    set((state) => {
      const updatedUsers = state.users.filter((user) => user.id !== id)
      // set((state) => ({users: state.users.filter((user) => user.id !== id),}))
      AsyncStorage.setItem('users',JSON.stringify(updatedUsers))
      return {users:updatedUsers}
    })
  },
  searchUser: (text) => {
    const allUsers = get().users
    const filteredUsers = allUsers.filter((user) =>
      user.first_name.toLowerCase().includes(text.toLowerCase())
    )
    set({ users: filteredUsers })
  }
}))

export default UsersApi