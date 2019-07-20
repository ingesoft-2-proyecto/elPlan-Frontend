import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import {Actions} from "react-native-router-flux";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";


export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: '',
    };
  }


  render() {
    return (
        console.log("Menu.js in screens"),
        <View style={styles.container}>
            <View style={styles.homeTextCont}>
                <Text style={styles.signupButton}> Logout </Text>
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
