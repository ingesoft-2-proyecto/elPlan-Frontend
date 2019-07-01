import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_SIGN_UP } from '../config/const';

export const sendDataToSignUp = async (name, lastname, password, confirmpassword, email, age) => {
    return fetch(API_SIGN_UP, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                "name": name,
                "surname": lastname,
                "age": age,
                "password": password,
                "password_confirmation": confirmpassword,
                "email": email
        })
    })
        .then((res) => {
            return res;
        })
}

export const sendPictureToSignUp = async (name, lastname, password, confirmpassword, email, age) => {
    return fetch(API_SIGN_UP, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": name,
            "surname": lastname,
            "age": age,
            "password": password,
            "password_confirmation": confirmpassword,
            "email": email
        })
    })
        .then((res) => {
            return res;
        })
}
