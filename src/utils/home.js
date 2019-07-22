import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_USERS, API_USERS_PICTURE } from '../config/const';
import { getIDToken } from './login';

const ID = 'id';
const NAME = 'name';
const LASTNAME = 'lastname';
const AGE = 'age';
const EMAIL = 'email';
const URL = 'fileURL';
const DATE = 'date';

console.log("home.js in utils, general class");

export const storeUserPicture = async(url) => {
  console.log("home.js in utils, storeUserPicture");
    try {
        AsyncStorage.setItem(URL, url);
    } catch (error) {
        console.log("Guardando foto usuario | error")
    }
}

export const setUserPicture = async (user_id) => {
  console.log("home.js in utils, setUserPicture");
    try {
        const API_PICTURE = `${API_USERS_PICTURE}/${user_id}`;
        let response = await fetch(API_PICTURE, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        let res = await response.json();
        storeUserPicture(
            res.photo_url
        )
        return response
    } catch (error) {
        console.log("Recibiendo foto usuario | error")
    }
}

export const getUrl = async () => {
  console.log("home.js in utils, getUrl");
    try {
        let url = await AsyncStorage.getItem(URL);
        console.log("Recibiendo url: " + url)
        return url
    } catch (error) {
        console.log("Recibiendo url | error")
    }
}

const storeUserData = async(id, name, lastname, age, email, date) => {
  console.log("home.js in utils, storeUserData");
    try {
        AsyncStorage.setItem(ID, id.toString());
        AsyncStorage.setItem(NAME, name);
        AsyncStorage.setItem(LASTNAME, lastname);
        AsyncStorage.setItem(AGE, age.toString());
        AsyncStorage.setItem(EMAIL, email);
        AsyncStorage.setItem(DATE, date)
    } catch (error) {
        console.log("Guardando info usuario | error")
    }

}

export const setUserData = async (token) => {
  console.log("home.js in utils, setUserData");
    try {
        let idtoken = await getIDToken()
        const API_ACTUAL_USER = `${API_USERS}/${idtoken}`;
        let response = await fetch(API_ACTUAL_USER, {
            method: 'GET',
            headers: new Headers({
                "Authorization": 'Bearer ' + token,
            }),
        });
        let res = await response.json();
        storeUserData(
            res.id,
            res.name,
            res.surname,
            res.age,
            res.email,
            res.born_date
        )
        return response
    } catch (error) {
        console.log("Recibiendo info usuario | error")
    }
}

export const getID = async () => {
  console.log("home.js in utils, getID");
    try {
        let id = await AsyncStorage.getItem(ID);
        console.log("Recibiendo ID: " + id)
        return id
    } catch (error) {
        console.log("Recibiendo ID | error")
    }
}

export const getDate = async () => {
    try {
        let date = await AsyncStorage.getItem(DATE);
        console.log("Recibiendo ID: " + date)
        return date
    } catch (error) {
        console.log("Recibiendo ID | error")
    }
}

export const getName = async () => {
  console.log("home.js in utils, getName");
    try {
        let name = await AsyncStorage.getItem(NAME);
        console.log("Recibiendo Name: " + name)
        return name
    } catch (error) {
        console.log("Recibiendo Name | error")
    }
}

export const getLastname = async () => {
  console.log("home.js in utils, getLastname");
    try {
        let lastname = await AsyncStorage.getItem(LASTNAME);
        console.log("Recibiendo Lastname: " + lastname)
        return lastname
    } catch (error) {
        console.log("Recibiendo Lastname | error")
    }
}

export const getAge = async () => {
  console.log("home.js in utils, getAge");
    try {
        let age = await AsyncStorage.getItem(AGE);
        console.log("Recibiendo Age: " + age)
        return age
    } catch (error) {
        console.log("Recibiendo Age | error")
    }
}

export const getEmail = async () => {
  console.log("home.js in utils, getEmail");
    try {
        let email = await AsyncStorage.getItem(EMAIL);
        console.log("Recibiendo Email: " + email)
        return email
    } catch (error) {
        console.log("Recibiendo Email | error")
    }
}
