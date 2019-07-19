import React from 'react';
import { AsyncStorage } from 'react-native';
import { API_LOG_IN } from '../config/const';

const ID = 'id';

export const logOut = async () => {
    await AsyncStorage.removeItem(ID)
}