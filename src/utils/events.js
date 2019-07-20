import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_EVENTS, API_EVENT_PICTURE } from '../config/const';

const FILTER = "0";
<<<<<<< master

export const storeFilter = async (filter) => {
=======
const END_POINT_EVENTS = "";

export const setEndpoint = async (endpoint) => {
    try {
        //END_POINT_EVENTS= JSON.stringify(endpoint.toString())
        await AsyncStorage.setItem("END_POINT_EVENTS", JSON.stringify(endpoint.toString()));
        console.log("Endpoint guardado ---------------------------")
    } catch (error) {
        console.log("storeFilter | Something went wrong")
    }
}

export const getEndpoint = async (key) => {
  console.log("events.js in utils, getEndpoint -----------------------");
    try {
        //var endpoint = "1";
        let endpoint = AsyncStorage.getItem(key);

        console.log(" ??????????????????????????? getFilter | Filter is: " + endpoint)
        return endpoint
    } catch (error) {
        console.log("Something went wrong -.-----------")
    }
}

export const storeFilter = async (filter) => {
  console.log("events.js in utils, storeFilter");
>>>>>>> canietot - Se carga desarrollo para visualizacion de eventos.
    try {
        await AsyncStorage.setItem(FILTER, filter.toString());
    } catch (error) {
        console.log("storeFilter | Something went wrong")
    }
}

export const getFilter = async () => {
<<<<<<< master
=======
  console.log("events.js in utils, getFilter");
>>>>>>> canietot - Se carga desarrollo para visualizacion de eventos.
    try {
        let filter = await AsyncStorage.getItem(FILTER);
        console.log("getFilter | Filter is: " + filter)
        return filter
    } catch (error) {
        console.log("Something went wrong")
    }
}

export const getEvents = async () => {
<<<<<<< master
=======
  console.log("events.js in utils, getEvents");
>>>>>>> canietot - Se carga desarrollo para visualizacion de eventos.
    return fetch(API_EVENTS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res;
        })
}

export const setEventPicture = async (event_id) => {
<<<<<<< master
=======
  console.log("events.js in utils, setEventPicture");
>>>>>>> canietot - Se carga desarrollo para visualizacion de eventos.
    try {
        const API_PICTURE2 = `${API_EVENT_PICTURE}/${event_id}`;
        let response = await fetch(API_PICTURE2, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        let res = await response.json();
        let url = res.photo_url
        return url;
    } catch (error) {
        console.log("Recibiendo foto usuario | error")
    }
}
