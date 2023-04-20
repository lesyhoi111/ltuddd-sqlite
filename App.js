import React, { PureComponent, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Class from './src/Screens/Class'
import Login from './src/Screens/Login'
import ClassDetail from './src/Screens/ClassDetail'
import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({
  name: 'btsql-data.db',
  location: 'default'
});

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    deletesql();
    createTableUser();
    createTableClass();
    createTableStudent();
    addData();
  }, [])
  const deletesql = () => {
    db.transaction((tx) => {
      tx.executeSql(`DROP TABLE IF EXISTS class`, [], (tx, results) => {
        console.log(`Bảng đã bị xóa.`);
      }, (error) => {
        console.log(`Xóa bảng thất bại: `, error);
      });
    });

    db.transaction((tx) => {
      tx.executeSql(`DROP TABLE IF EXISTS student`, [], (tx, results) => {
        console.log(`Bảng đã bị xóa.`);
      }, (error) => {
        console.log(`Xóa bảng thất bại: `, error);
      });
    });

    db.transaction((tx) => {
      tx.executeSql(`DROP TABLE IF EXISTS user`, [], (tx, results) => {
        console.log(`Bảng đã bị xóa.`);
      }, (error) => {
        console.log(`Xóa bảng thất bại: `, error);
      });
    });
  };

  const listClass = [
    {
      id: "class1",
      name: "12/5",
      students: 35,
    },
    {
      id: "class2",
      name: "12/1",
      students: 30,
    },
    {
      id: "class3",
      name: "12/4",
      students: 41,
    },
  ]

  const listStudent = [
    {
      id: "student01",
      name: "Lê Sỹ Hội",
      Dob: "18/01/2002",
      url: "https://image.tienphong.vn/600x315/Uploaded/2023/neg-olyrlys/2022_12_15/ronaldo-real-madrid-9025.jpg",
      idClass: "class1"
    },
    {
      id: "student02",
      name: "Lê Sỹ",
      Dob: "10/01/2000",
      url: "https://znews-stc.zdn.vn/static/topic/person/cristiano-ronaldo.jpg",
      idClass: "class1"
    },
    {
      id: "student03",
      name: "Lê Hội",
      Dob: "18/12/2005",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
      idClass: "class2"
    },
    {
      id: "student04",
      name: "Lê Văn",
      Dob: "03/12/2001",
      url: "https://cdn.resfu.com/media/img_news/agencia-efe_multimedia_3511947.multimedia.photos.13810162.file.jpg",
      idClass: "class3"
    },
    {
      id: "student05",
      name: "Lê Quang",
      Dob: "03/12/2001",
      url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg",
      idClass: "class3"
    },
    {
      id: "student06",
      name: "Lê A",
      Dob: "03/12/2001",
      url: "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
      idClass: "class1"
    },
    {
      id: "student07",
      name: "Lê B",
      Dob: "03/12/2001",
      url: "https://haycafe.vn/wp-content/uploads/2022/06/anh-la-vang-roi-buon-tren-mat-nuoc.jpg",
      idClass: "class2"
    },
  ]


  const addData = () => {
    listClass.forEach(element => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO class (idClass, name, students) VALUES (?,?,?)',
          [element.id, element.name, element.students],
          () => {
            console.log('Data inserted successfully');
          },
          (error) => {
            console.log('Error inserting data:', error);
          },
        );
      });
    });

    listStudent.forEach(element => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO student (idStudent, name, Dob, url, idClassStudy) VALUES (?,?,?,?,?)',
          [element.id, element.name, element.Dob, element.url, element.idClass],
          () => {
            console.log('Data inserted successfully');
          },
          (error) => {
            console.log('Error inserting data:', error);
          },
        );
      });
    });
  }

  const createTableUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT)',
        [],
        () => {
          console.log('Table created successfully');
        },
        (error) => {
          console.log('Error creating table:', error);
        },
      );
    });
  }

  const createTableClass = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS class (id INTEGER PRIMARY KEY AUTOINCREMENT,idClass TEXT, name TEXT, students INTEGER)',
        [],
        () => {
          console.log('Table created successfully');
        },
        (error) => {
          console.log('Error creating table:', error);
        },
      );
    }); 
  }

  const createTableStudent = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT,idStudent TEXT, name TEXT, Dob TEXT, url TEXT, idClassStudy TEXT)',
        [],
        () => {
          console.log('Table created successfully');
        },
        (error) => {
          console.log('Error creating table:', error);
        },
      );
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Class" component={Class} />
        <Stack.Screen name="ClassDetail" component={ClassDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;