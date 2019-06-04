import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const App_Butt_form = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Aqui iran los formularios o pantalla de bienvenida de los que se registren en redes
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

export default App_Butt_form;