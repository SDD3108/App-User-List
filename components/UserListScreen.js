import { StyleSheet, Text, View, FlatList,TouchableOpacity,SafeAreaView } from 'react-native'
import React, { useState,useEffect } from 'react'
import Input from '../shared/input/Input'
import Button from '../shared/button/Button'
import CustomImage from '../shared/image/CustomImage'
import AuthSlice from '../store/authSlice'
import UsersApi from '../store/userSlice'

export default function UserListScreen({navigation,route}) {
  const {users, fetchUsers, searchUser } = UsersApi()
  const {loadUsers} = AuthSlice()
  const [search,setSearch] = useState('')
  const [page,setPage] = useState(1)
  const usersOnPage = 2

  useEffect(()=>{
    fetchUsers()
    loadUsers()
  },[])
  useEffect(() => {
    if(search.trim() == ''){
      fetchUsers()
    }
    else{
      searchUser(search)
    }
    setPage(1)
  }, [search])

  const pogin = (page - 1) * usersOnPage
  const poginUsers = users.slice(pogin,pogin + usersOnPage)

  return (
    <SafeAreaView style={{justifyContent:'center',alignItems:'center'}}>
      <Text style={styles.title}>UserListScreen</Text>
      <Input style={styles.input} placeholder="Find a User..." value={search} onChangeText={(text) => setSearch(text)}
      />
      <FlatList data={poginUsers} keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.user}>
            <CustomImage source={{uri: item.avatar}} style={{ width: 200, height: 200, borderRadius: 12, marginTop:10, }}/>
            <View style={styles.userRow}>
                <Text style={styles.label}>Name :</Text>
                <Text style={styles.value}>{item.first_name}</Text>
            </View>
            <View style={styles.userRow}>
                <Text style={styles.label}>Last Name :</Text>
                <Text style={styles.value}>{item.last_name}</Text>
            </View>
            <View style={styles.userRow}>
                <Text style={styles.label}>Email :</Text>
                <Text style={styles.value}>{item.email}</Text>
            </View>
            <Button style={styles.btn} name='Details' onPress={()=>navigation.navigate('Details',{ id: item.id })} />
          </View>
        )}
      />
      <View style={styles.poginContainer}>
        <Button style={styles.paginationButton} name='<<' onPress={()=>setPage(1)}  disabled={page == 1} />
        <Button style={styles.paginationButton} name='<' onPress={() => setPage((prev) => prev - 1)} disabled={page == 1} />
        <Text style={styles.pageNumber}>{page}</Text>  
        <Button style={styles.paginationButton} name='>' onPress={() => setPage((prev) => prev + 1)} disabled={pogin + usersOnPage >= users.length} />
        <Button style={styles.paginationButton} name='>>' onPress={()=> setPage(Math.ceil(users.length / usersOnPage))} disabled={page == Math.ceil(users.length / usersOnPage)} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    touch:{
      width:400,
      height:200,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
    },
    user:{
        width:320,
        height:350,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:24,
        marginTop:30,
    },
    userRow:{
        width:300,
        flexDirection: "row",
        justifyContent:'center',
        alignItems: "center",
        marginBottom: 4,
        marginLeft:'auto',
        marginRight:'auto',
    },
    label:{
        fontWeight: "bold",
        width: 120,
        textAlign: "left",
    },
    value: {
        // flex: 1,
        width:162,
        textAlign:'left',
        fontSize:14,
    },
    btn:{
      width:200,
      height:50,
      paddingHorizontal: 0,
      paddingVertical:0,
    },
    input:{
      width:400
    },
    title:{
      fontSize:24,
      fontWeight:700,
    },
    paginationButton:{
      width:50,
      height:50,
      paddingHorizontal: 0,
      paddingVertical:0,
    },
    pageNumber:{
      fontSize:32,
      textAlign:'center',
      fontWeight:700,
    },
    poginContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:30,
      marginBottom:100,
      marginTop:5,
    }
})