import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage } from 'react-native';
import Logo from '../components/Logo';
import { Actions } from 'react-native-router-flux';
import Expo from "expo";
import { validateLogin } from "../utils/validation";
import { Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken, storeID } from '../utils/login';

export default class Landing_page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: '',
    };
  }

  signup() {
    Actions.signup()
  }

  login() {
    Actions.login()
  }

  landingpage() {
    Actions.landingpage()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.container2}>
            <Text style={styles.headling}>LOGUEANDO FACEBOOK...</Text>
            <ActivityIndicator size="large" color="#00CCFF" />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.profileTextCont}>
          <Text style={styles.icons2}>WITHOUT ANYTHING TO DO?</Text>
        </View>
        <View style={styles.profileTextCont}>
          <Text style={styles.signupButton2}>Get personalized recommendations to your liking.</Text>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity style={styles.button}
            onPress={() => this.login()}>
            <Text style={styles.buttonText}>Do you have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFacebook}
            onPress={() => this.landingpage()}>
            <Text style={styles.buttonText}>F | Login with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => this.signup()}>
            <Text style={styles.buttonText}>Register by mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#707070',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  },
  container2: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: 300,
    height: 45,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },
  profileTextCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: wp('6%'),
    paddingBottom: wp('3%'),
  },
  buttonFacebook: {
    width: 300,
    backgroundColor: '#3b5998',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  button: {
    width: 300,
    backgroundColor: '#00CCFF',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  icons2: {
    color: '#00CCFF',
    fontSize: 24,
    fontWeight: '500'
  },
  signupButton2: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500'
  },
  headling: {
    color: '#00CCFF',
    fontSize: hp('6%'),
    textAlign: 'center',
    margin: hp('5%'),
  },
  containerLoading: {

  }
});
