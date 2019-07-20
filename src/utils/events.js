import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_EVENTS, API_EVENT_PICTURE } from '../config/const';
import { getIDToken } from './login';

const FILTER = "0";

export const sendDataToEvents = async (name, description, cost, borough, address, type_of_public, category, hour) => {
    let user_id = await getIDToken()
    return fetch(API_EVENTS, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            "name": name,
            "description": description,
            "cost": cost,
            "borough": borough,
            "address": address,
            "type_of_public": type_of_public,
            "category": category,
            "date_of_event": hour,
            "user_id": user_id,
        })
    })
        .then((res) => {
            return res;
        })
}

export const sendPictureToEvents = async (formdata, event_id) => {
    const API_SIGN_UP_EVENT = `${API_EVENTS}/${event_id}`;
    return fetch(API_SIGN_UP_EVENT, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: formdata
    })
        .then((res) => {
            return res;
        })
}

export const storeFilter = async (filter) => {
    try {
        await AsyncStorage.setItem(FILTER, filter.toString());
    } catch (error) {
        console.log("storeFilter | Something went wrong")
    }
}

export const getFilter = async () => {
    try {
        let filter = await AsyncStorage.getItem(FILTER);
        console.log("getFilter | Filter is: " + filter)
        return filter
    } catch (error) {
        console.log("Something went wrong")
    }
}

export const getEvents = async () => {
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
