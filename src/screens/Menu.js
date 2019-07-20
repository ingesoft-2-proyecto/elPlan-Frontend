import React, { Component } from 'react';
import axios from "axios";
import {
  ActivityIndicator,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import {Actions} from "react-native-router-flux";
import {logOut} from "../utils/logout";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";


export default class Menu extends Component {

  constructor(props) {
    super(props);
    console.log("Menu.js in screens constructor");
    this.state = {
      isLoading: false,
      name: '',
      source: {uri: ''},
      search: '',
      error: '',
      dataset: null,
      datasetState: null,
    };
  }


  logout(){
    console.log("Menu.js in screens, logout()");
    logOut();
    Actions.login()
  }

  render() {
    return (
        console.log("Menu.js in screens"),
        <View style={styles.container}>
            <View style={styles.homeTextCont}>
              <TouchableOpacity onPress={this.logout}>
                <Text style={styles.signupButton}> Logout </Text>
              </TouchableOpacity>
            </View>
        </View>
    )
  }
}
  const
  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#707070',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#000000',
    },
    signupButton: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '500'
    },
    homeTextCont: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
      paddingTop: wp('5%'),
      paddingBottom: wp('3%'),
      backgroundColor: '#00CCFF',
    },
  });
