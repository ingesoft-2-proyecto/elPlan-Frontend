
import React, {Component} from 'react';
import colors from '../styles/colors';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
const FB_APP_ID = 'fb2860165380720120';

import Icon from 'react-native-vector-icons/FontAwesome';
//import { Icon } from 'react-native-elements';
//import Icon from '../../node_modules/react-native-vector-icons/FontAwesome';
 import RoundedButton from '../components/buttons/RoundedButton';
import SocialMediaButton from '../components/buttons/SocialMediaButton';

export default class LoggedOut extends Component {
  async onFacebookPress(){
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "FB_APP_ID",
    {
      permissions: ["public_profile"]
    }
  );
  //if (type === "success") {
    //const response = await fetch(
      //`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`
    //);
  //  const { picture, name, birthday } = await response.json();
    //Alert.alert(
      //'Logged in!'

    //)
  //} else {
    // Handle errors here.
  //
  //}}
  //}}
  firebase.auth().signInWithCredential(tokens).then(function(result) {
   const loginParams = {"name": result.additionalUserInfo.profile.name,"email": result.additionalUserInfo.profile.email,
       "avatar": result.additionalUserInfo.profile.picture.data.url }

s

      if(this.state.error === null){
     // setTimeout(function(){document.location.reload()},1000);
      }
    // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = result.credential.accessToken;
    // The signed-in user info.
    //var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    //var errorCode = error.code;
    //var errorMessage = error.message;
    // The email of the user's account used.
   // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    //var credential = error.credential;
    // ...
  });
   };

  signOut = (response) => {
      firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("deslogeado")
  }).catch(function(error) {
    // An error happened.
  });
  }

  onGooglePress(){
    alert('El boton de google ');
  }

  onCreateAccount(){
    alert('El boton de cuenta');
  }

  onStartPress(){
    alert('El boton comenzar ');
  }

  singInButtonPress(){
      alert('Sign Up ');
  }


  render() {
    return (
  <View style = {styles.wrapper}>
      <View style={styles.welcomeWrapper} >

               <Text style={styles.welcomeText}>¿Sin nada que hacer?</Text>
               <Text style={styles.subwelcomeText}>Obten ideas de actividades personalizadas en tus gustos</Text>
               <RoundedButton
                 text="¿Tienes una cuenta? Ingresa aqui"
                 textColor={colors.green01}
                 background={colors.white}
                 //icon = <Icon name="street-view" size={20} style={styles.facebookButtonIcon} />
                 handleOnPress={this.onStartPress}
               />
             <Text style={styles.subwelcomeText}> Continua con tus redes sociales </Text>

           <View style= {styles.buttonMedia} >

                 <SocialMediaButton
                     icon = <Icon name="facebook" size={50} style={styles.facebookButtonIcon}  />
                    handleOnPress={this.onFacebookPress}
                   />

                 <SocialMediaButton
                     //icon = <Icon name="google" size={50} style={styles.googleButtonIcon} />
                   //handleOnPress={this.onGooglePress}
                   />
               </View>

               <RoundedButton
                 text="Registrate por correo"
                 textColor={colors.blueC}
                 icon = <Icon name="envelope" size={20} style={styles.registerButtonIcon}  />
               handleOnPress={this.onCreateAccount}
               />




      </View>
  </View>
 );
}
}

const styles = StyleSheet.create ({
  wrapper:{
    flex:1,
    display: 'flex',
    backgroundColor: '#707070',

  },

  welcomeWrapper:{
    flex: 1,
    display: 'flex',
    marginTop: 80,
    padding: 20,


  },

  welcomeText:{
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 30,

  },

  subwelcomeText:{
    fontSize: 15,
    color: colors.white,
    fontWeight: '300',
    marginTop: 10,
    marginBottom: 40,
  },

  buttonMedia:{
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent:'center',

  },

  facebookButtonIcon:{
    color:colors.facebookColor,

  },

  googleButtonIcon:{
    color:colors.googleColor,
    //position: 'relative',
    //left: 20,
    //zIndex: 8,

  },

  registerButtonIcon:{
    color:colors.blueC,
    position: 'relative',
    left: 20,
    zIndex: 8,

  },

  singInButton:{
    marginTop: 15,
  },

  singInButtonText:{
    color:colors.blueC,
    fontSize: 16,


  },


});
