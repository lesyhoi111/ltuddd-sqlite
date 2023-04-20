import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({
  name: 'btsql-data.db',
  location: 'default'
});

const ClassDetail = (props) => {

  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const { data, setData } = useState([])
  var temp = [];

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM student WHERE idClassStudy='"+route.params.item.idClass+"'",
        [],
        (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; ++i){
            const row = results.rows.item(i);
            temp.push({
              idStudent: row.idStudent,
                name: row.name,
                Dob: row.Dob,
                url: row.url,
                idClassStudy: row.idClassStudy,
              });
          }
        },
        (tx, error) => {
          console.error(`Failed to get todos: ${error}`);
        }
      );
    });
  }, [])



  const renderItem = ({ item, index }) => {
    return (

      <TouchableOpacity style={styles.container} >
        <View style={{ flex: 1.5 }}>
          <Image
            style={styles.images}
            source={{uri:item.url}}
            resizeMode='stretch'></Image>
        </View>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={styles.txt}>Id: {item.idStudent}</Text>
          <Text style={styles.txt}>Name: {item.name}</Text>
          <Text style={styles.txt}>Dob: {item.Dob}</Text>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 10, height: 60, alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginVertical: 5, color: 'black', flex: 1 }}>Classes Detail</Text>
      </View>
      <TouchableOpacity style={[styles.container, { flexDirection: "column", justifyContent: "center", backgroundColor: '#DDD' }]} >
        <Text style={styles.txts}>Id: {route.params.item.idClass}</Text>
        <Text style={styles.txts}>Name: {route.params.item.name}</Text>
        <Text style={styles.txts}>Students: {route.params.item.students}</Text>
      </TouchableOpacity>
      <FlatList
        data={temp}
        renderItem={renderItem}
        keyExtractor={(item) => item.idStudent}
      />

    </SafeAreaView>
  );
};

export default ClassDetail;

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
  },
  container: {
    flexDirection: 'row',
    height: 110,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 30
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 25
  },
  txts: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black'
  },
  txt: {
    fontSize: 21,
    fontWeight: '500',
    marginLeft: 10,
    color: 'black'
  },
  images: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
  },
});
