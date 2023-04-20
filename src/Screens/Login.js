import React, { PureComponent, useState, useEffect } from 'react';
import { Alert, Button, SafeAreaView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({
    name: 'btsql-data.db',
    location: 'default'
});
function Login(props) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    var temp = [];
    const get=()=>{
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM user',
              [],
              (tx, results) => {
                const len = results.rows.length;
                for (let i = 0; i < len; ++i){
                  const row = results.rows.item(i);
                  temp.push({
                      user: row.user,
                      password: row.pass,
                    });
                }
                console.log(temp);
              },
              (tx, error) => {
                console.error(`Failed to get todos: ${error}`);
              }
            );
          });
    }
    const login = () => {
        if(user.trim() === ''){
            Alert.alert("Mời nhập đầy đủ thông tin");
            return;
        }
        if(password.trim() === ''){
            Alert.alert("Mời nhập đầy đủ thông tin");
            return;
        }
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO user (user, pass) VALUES (?,?)',
                [user, password],
                () => {
                    console.log('Data inserted successfully');
                },
                (error) => {
                    console.log('Error inserting data:', error);
                },
            );
        });
        get();
        setUser("");
        setPassword("");
        navigate('Class');
    }
    return (

        <SafeAreaView style={{ flex: 1 }}>

            <Text style={{ fontSize: 40, alignSelf: 'center',color:'black',fontWeight:'bold',marginVertical:20}}>Login</Text>
            <View style={{ paddingHorizontal: 20, marginBottom:20}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Username:</Text>
                <TextInput style={{ backgroundColor: '#F6EBEF' ,borderWidth:2,borderColor:'pink'}} value={user} onChangeText={setUser}></TextInput>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Password:</Text>
                <TextInput style={{ backgroundColor: '#F6EBEF',borderWidth:2,borderColor:'pink' }} secureTextEntry={true} value={password} onChangeText={setPassword} ></TextInput>
            </View>
            <TouchableOpacity style={{ backgroundColor: 'blue', marginTop: 30, marginHorizontal: 40, borderRadius: 20,paddingVertical:7,marginTop:50 }} onPress={login}>
                <Text style={{ alignSelf: 'center', fontSize: 27, color: 'white',fontWeight:'bold' }}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default Login;