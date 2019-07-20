import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import firebase from 'firebase';


const firebaseConfig ={
  apiKey: "AIzaSyAc5qE3pLTgRY_5aUNL9NV5MXoZCpkZN_o",
  authDomain: "el-plan.firebaseapp.com",
  databaseURL: "https://el-plan.firebaseio.com",
  projectId: "el-plan",
  messagingSenderId: "1066517312122",
};

firebase.initializeApp(firebaseConfig);




import Routes from './src/routing/Routes';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="#1c313a"
           barStyle="light-content"
         />
        <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});
