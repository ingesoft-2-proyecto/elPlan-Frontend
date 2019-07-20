import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar , TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage} from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';
import Expo from "expo";
import { validateLogin } from "../utils/validation";
import { Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken, storeID } from '../utils/login';

export default class Login extends Component {

  constructor(props) {
    super(props);
    console.log("Login.js in screens constructor");
    this.state = {
      email: 'lahiguarans@unal.edu.co',
      password: '123456',
      isLoading: false,
      error: '',
    };
  }

	signup() {
    console.log("Login.js in screens, signup()");
		Actions.signup()
  }

  home() {
    console.log("Login.js in screens, home()");
    Actions.home()
  }

  goForm() {
    console.log("Login.js in screens, goForm()");
    if (validateLogin(this.state.password, this.state.email)) {

      this.sendData()
    }
  }

  async sendData() {
    console.log("Login.js in screens, sendData()");
    try {

      this.setState(
        {
          isLoading: true
        }
      )
      let response = await sendDataToLogIn(this.state.email, this.state.password)

      console.log("login | Response status: " + response.status)

      if (response.status >= 200 && response.status < 300) {
        let res = await response.json();
        this.setState(
          {
            error: ""
          }
        )
        let accessToken = res.token
        let idtoken = res.user_id
        storeToken(accessToken);
        storeID(idtoken);
        console.log("Access Token's Expiration: " + res.exp)
        console.log("Access Token's User ID: " + idtoken)
        this.setState({ isLoading: false })
        this.home()
      } else {
        removeToken()
        this.setState({ isLoading: false })
        this.setState({ error: "Invalid username or Password" })
        Alert.alert("Correo o contraseña invalida");
      }

    } catch (error) {
      this.setState({ isLoading: false })
      this.setState({ error: error })
      console.log("error: " + error)
    }
  }

	render() {
    if (this.state.isLoading) {
      return (
        console.log("Login.js in screens"),
        <View style={styles.container}>
          <View style={styles.container2}>
            <Text style={styles.headling}>LOGUEANDO...</Text>
            <ActivityIndicator size="large" color="#00CCFF" />
          </View>
        </View>
      );
    }
		return(
			<View style={styles.container}>
				<Logo/>
        <View style={styles.container2}>
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            maxLength= {100}
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity style={styles.button}
            onPress={() => this.goForm()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>¿No posees una cuenta?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> SIGN UP</Text></TouchableOpacity>
				</View>
			</View>
			)
	}
}
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#707070',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
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
  headling: {
    color: '#00CCFF',
    fontSize: hp('6%'),
    textAlign: 'center',
    margin: hp('5%'),
  },
  containerLoading: {

  }
});
