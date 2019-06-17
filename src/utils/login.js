import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_LOG_IN } from '../config/const';

const ACCESS_TOKEN = 'access_token';

export const storeToken = async (accessToken) => {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        getToken();
    } catch (error) {
        console.log("storeToken | Something went wrong")
    }
}

export const getToken = async () => {
    try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        console.log("getToken | token is: " + token)
        return token
    } catch (error) {
        console.log("Something went wrong")
    }
}

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        getToken();
    } catch (error) {
        console.log("removeToken | Something went wrong")
    }
}

export const sendDataToLogIn = async (email, password) => {
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