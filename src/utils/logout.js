import React from 'react';
import { AsyncStorage } from 'react-native';
import { API_LOG_IN } from '../config/const';

const ID = 'id';

console.log("logout.js in utils");

export const logOut = async () => {
  console.log("logout.js in utils, logOut");
    await AsyncStorage.removeItem(ID)
}
