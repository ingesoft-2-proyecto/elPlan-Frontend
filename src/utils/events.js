import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_EVENTS } from '../config/const';

const FILTER = '0';

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
