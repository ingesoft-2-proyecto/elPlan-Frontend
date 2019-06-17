import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage } from 'react-native';
import Logo from '../components/Logo';
import { Actions } from 'react-native-router-flux';
import Expo from "expo";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken } from '../utils/login';

export default class Signup extends Component<{}> {

  goBack() {
    Actions.pop();
  }

  goForm() {
    Actions.app_form();
  }

  constructor(props) {
    super(props);
    this.state = {
      name: 'Nombre',
      lastname: 'Apellido',
      birthday: new Date(),
      age: new Age(),
      email: 'Correo Electronico',
      password: 'Contraseña',
      isLoading: false,
      error: '',
    };
  }

  

	render() {
		return(
			<View style={styles.container}>
        <View style={styles.container2}>
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            onSubmitEditing={() => this.password.focus()}
          />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            ref={(input) => this.password = input}
          />
          <TouchableOpacity style={styles.button} onPress={this.goForm}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>¿Posees una cuenta?</Text>
					<TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> LOGIN </Text></TouchableOpacity>
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
  }

});