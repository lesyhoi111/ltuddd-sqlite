import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'btsql-data.db',
  location: 'default'
});
const Class = (props) => {

  const { navigation, route } = props
  const { navigate, goBack } = navigation

  var temp = [];

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM class',
        [],
        (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; ++i){
            const row = results.rows.item(i);
            temp.push({
                idClass: row.idClass,
                name: row.name,
                students: row.students,
              });
          }
        },
        (tx, error) => {
          console.error(`Failed to get todos: ${error}`);
        }
      );
    });
  }, []);


  const renderItem = ({ item, index }) => {
    return (

      <TouchableOpacity style={styles.container} onPress={() => navigate('ClassDetail', { item })}>
        <View style={{ flex: 4, justifyContent: "center" }}>
          <Text style={styles.txt}>Id: {item.idClass}</Text>
          <Text style={styles.txt}>Name: {item.name}</Text>
          <Text style={styles.txt}>Students: {item.students}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.txt, { marginRight: 10 }]}>#{index + 1}</Text>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 10, height: 60, alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginVertical: 5, color: 'black', flex: 1 }}>Classes</Text>
      </View>
      <FlatList
        data={temp}
        renderItem={renderItem}
        keyExtractor={(item) => item.idClass}
      />

    </SafeAreaView>
  );
};

export default Class;

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
  },
  delete: {
    fontSize: 24,
    color: "red",
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
  txt: {
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
    marginLeft: 15,
  },
});
