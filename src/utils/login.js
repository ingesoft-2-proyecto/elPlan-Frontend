import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_LOG_IN } from '../config/const';

const ACCESS_TOKEN = 'access_token';
const ID = 'id';

console.log("login.js in utils");

export const storeID = async (id) => {
  console.log("login.js in utils, storeID");
    try {
        await AsyncStorage.setItem(ID, id.toString());
    } catch (error) {
        console.log("storeId | Something went wrong")
    }
}

export const getIDToken = async () => {
  console.log("login.js in utils, getIDToken");
    try {
        let id = await AsyncStorage.getItem(ID);
        console.log("getId | Id is: " + id)
        return id
    } catch (error) {
        console.log("Something went wrong")
    }
}

export const storeToken = async (accessToken) => {
  console.log("login.js in utils, storeToken");
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        getToken();
    } catch (error) {
        console.log("storeToken | Something went wrong")
    }
}

export const getToken = async () => {
  console.log("login.js in utils, getToken");
    try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        console.log("getToken | token is: " + token)
        return token
    } catch (error) {
        console.log("Something went wrong")
    }
}

export const removeToken = async () => {
  console.log("login.js in utils, removeToken");
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        getToken();
    } catch (error) {
        console.log("removeToken | Something went wrong")
    }
}

export const sendDataToLogIn = async (email, password) => {
  console.log("login.js in utils, sendDataToLogIn");
    return fetch(API_LOG_IN, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                "email": email,
                "password": password,
        })
    })

}
