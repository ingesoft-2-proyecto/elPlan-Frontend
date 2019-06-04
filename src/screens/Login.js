import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar , TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';
import Expo from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken } from '../utils/login';

export default class Login extends Component<{}> {

	signup() {
		Actions.signup()
  }

  home() {
    Actions.home()
  }

  constructor(props) {
    super(props);
    this.state = {
      email: 'prueba@gmail.com',
      password: '123456789',
      isLoading: false,
      error: ''
    };
  }

  async sendData() {

    try {
      this.setState({ isLoading: true })
      let response = await sendDataToLogIn(this.state.email, this.state.password)

      console.log("login | res status: " + response.status)

      if (response.status >= 200 && response.status < 300) {
        let res = await response.json();
        this.setState({ error: "" })
        let accessToken = res.jwt
        storeToken(accessToken);
        console.log("Access Token: " + accessToken)
        this.setState({ isLoading: false })
        this.home()
      } else {
        removeToken()
        this.setState({ isLoading: false })
        this.setState({ error: "Algo salio mal" })
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
        <View>
          <View style={styles.home_TextContainer}>
            <Text style={styles.headling}>Loading...</Text>
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
          />
          <TouchableOpacity style={styles.button}
            onPress={() => this.sendData()}>
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
  }
});