import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_SIGN_UP } from '../config/const';
import { getToken } from './login';

export const sendDataToSignUp = async (name, lastname, password, confirmpassword, email, age, date, notifications) => {
    return fetch(API_SIGN_UP, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            "name": name,
            "surname": lastname,
            "born_date": date,
            "age": age,
            "password": password,
            "password_confirmation": confirmpassword,
            "notifications": notifications,
            "email": email,
        })
    })
        .then((res) => {
            return res;
        })
}

export const sendPictureToSignUp = async (formdata, user_id) => {
    const API_SIGN_UP_USER = `${API_SIGN_UP}/${user_id}`;
    return fetch(API_SIGN_UP_USER, {
        method: 'PUT',
        headers: new Headers({
            "Authorization": 'Bearer ' + await getToken(),
            'Content-Type': 'application/json',
        }),
        body: formdata
    })
        .then((res) => {
            return res;
        })
}
