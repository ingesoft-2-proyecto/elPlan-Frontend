import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const Menu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Aca ira el menu 
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

export default Menu;
