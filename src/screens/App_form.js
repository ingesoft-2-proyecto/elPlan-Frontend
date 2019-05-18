import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const App_form = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Formulario de los  que se registran directamente en la pagina
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

export default App_form;
