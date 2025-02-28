import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddUserComponent from './components/AddUserComponent';
import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import UserDetailScreen from './components/UserDetailScreen';
import UserListScreen from './components/UserListScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabNavigator =()=>{
  return(
    <Tab.Navigator>
        <Tab.Screen options={{headerShown: false,tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='login' color={color} size={24}/>),}} component={LoginScreen} name='Login'/>
        <Tab.Screen options={{headerShown: false,tabBarIcon: ({ color }) => (<MaterialIcons name='app-registration' color={color} size={24}/>),}} component={RegistrationScreen} name='Registration'/>
        <Tab.Screen options={{headerShown: false,tabBarIcon: ({ color }) => (<Entypo name='list' color={color} size={24}/>),}} component={UserListScreen} name='List'/>
        <Tab.Screen options={{headerShown: false,tabBarIcon: ({ color }) => (<Entypo name='add-to-list' color={color} size={24}/>),}} component={AddUserComponent} name='Add User'/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Back" component={TabNavigator} />
        <Stack.Screen name="Details" component={UserDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
