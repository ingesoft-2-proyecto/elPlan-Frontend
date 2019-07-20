import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const Guest_page = () => {
  return (
  console.log("Guest_page.js in screens"),
    <View style={styles.container}>
      <Text style={styles.welcome}>
       La pagina que enviara a registrarse a los invitados 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default Guest_page;
