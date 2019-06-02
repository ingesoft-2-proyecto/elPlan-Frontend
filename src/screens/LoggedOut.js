import React, {Component} from 'react';
import colors from '../styles/colors';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import RoundedButton from '../components/buttons/RoundedButton';

export default class LoggedOut extends Component {
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
    marginBottom: 20,

  },

  subwelcomeText:{
    fontSize: 20,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },

  logo:{
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 40,

  }
});
