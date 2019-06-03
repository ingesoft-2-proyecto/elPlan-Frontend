import React, {Component} from 'react';
import colors from '../styles/colors';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
//import { Icon } from 'react-native-elements';
//import Icon from '../../node_modules/react-native-vector-icons/FontAwesome';
 import RoundedButton from '../components/buttons/RoundedButton';
import SocialMediaButton from '../components/buttons/SocialMediaButton';

export default class LoggedOut extends Component {
  onFacebookPress(){
    alert('El boton de facebook ');
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



  render() {
    return (
  <View style = {styles.wrapper}>
      <View style={styles.welcomeWrapper} >
             <Image
               source= {require('../assets/logoProto.png')}
               style={styles.logo}
               />
               <Text style={styles.welcomeText}>¿Sin nada que hacer?</Text>
               <Text style={styles.subwelcomeText}>Obten ideas de actividades personalizadas en tus gustos</Text>
               <RoundedButton
                 text="Comenzar"
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
                     icon = <Icon name="google" size={50} style={styles.googleButtonIcon} />
                   handleOnPress={this.onGooglePress}
                   />
               </View>

               <RoundedButton
                 text="Registrate por correo"
                 textColor={colors.white}
                 icon = <Icon name="envelope" size={20} style={styles.registerButtonIcon}  />
               handleOnPress={this.onCreateAccount}
               />

             <TouchableHighlight style={styles.singInButton} >
               <Text style={styles.singInButtonText}> ¿Ya tienes una cuenta? Ingresa aqui </Text>

           </TouchableHighlight>


      </View>
  </View>
 );
}
}

const styles = StyleSheet.create ({
  wrapper:{
    flex:1,
    display: 'flex',
    backgroundColor: colors.green01,

  },

  welcomeWrapper:{
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,


  },

  welcomeText:{
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 10,

  },

  subwelcomeText:{
    fontSize: 15,
    color: colors.white,
    fontWeight: '300',
    marginTop: 20,
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
    color:colors.white,
    position: 'relative',
    left: 20,
    zIndex: 8,

  },

  singInButton:{
    marginTop: 15,
  },

  singInButtonText:{
    color:colors.white,
    fontSize: 16,


  },

  logo:{
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 10,

  }
});
