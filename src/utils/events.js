import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_EVENTS, API_EVENT_PICTURE } from '../config/const';
import { getIDToken } from './login';

const FILTER = '0';
const EVENT_ID = 'event_id';
const NAME = 'name';
const BOROUGH = 'borugh';
const ADDRESS = 'address';
const DESCRIPTION = 'description';
const CATEGORY = 'category';
const TYPE_OF_PUBLIC = 'type_of_public';
const COST = 'cost';
const HOUR = 'date';
const OWNER = 'owner';
const URL = 'url';


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
    const API_PICTURE2 = `${API_EVENTS}/${event_id}`;
    return fetch(API_PICTURE2, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: formdata
    })
        .then((res) => {
            return res;
        })
}

export const storeEventID = async (event_id) => {
    try {
        await AsyncStorage.setItem(EVENT_ID, event_id.toString());
    } catch (error) {
        console.log("storeEventID | Something went wrong")
    }
}

export const getEventID = async () => {
    try {
        let event_id = await AsyncStorage.getItem(EVENT_ID);
        console.log("getEventID | Event ID is: " + event_id)
        return event_id
    } catch (error) {
        console.log("Something went wrong")
    }
}

export const storeFilter = async (filter) => {
  console.log("events.js in utils, storeFilter");
    try {
        await AsyncStorage.setItem(FILTER, filter.toString());
    } catch (error) {
        console.log("storeFilter | Something went wrong")
    }
}

export const getFilter = async () => {
  console.log("events.js in utils, getFilter");
    try {
        let filter = await AsyncStorage.getItem(FILTER);
        console.log("getFilter | Filter is: " + filter)
        return filter
    } catch (error) {
        console.log("Something went wrong")
    }
}

export const getEvents = async () => {
  console.log("events.js in utils, getEvents");
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

export const storeEventPicture = async (url) => {
    try {
        AsyncStorage.setItem(URL, url);
    } catch (error) {
        console.log("Guardando foto evento | error")
    }
}

export const setEventPicture = async () => {
    try {
        let event_id = await getEventID()
        const API_PICTURE2 = `${API_EVENT_PICTURE}/${event_id}`;
        console.log("url picture event" + API_PICTURE2)
        let response = await fetch(API_PICTURE2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let res = await response.json();
        storeEventPicture(
            res.photo_url
        )
        return url;
    } catch (error) {
        console.log("Recibiendo foto evento | error")
    }
}

export const getUrl = async () => {
    try {
        let url = await AsyncStorage.getItem(URL);
        console.log("Recibiendo url: " + url)
        return url
    } catch (error) {
        console.log("Recibiendo url | error")
    }
}

const storeEventData = async (id, name, description, address, borough, hour, cost, type_of_public, category) => {
    try {
        AsyncStorage.setItem(EVENT_ID, id.toString());
        AsyncStorage.setItem(NAME, name);
        AsyncStorage.setItem(DESCRIPTION, description);
        AsyncStorage.setItem(ADDRESS, address);
        AsyncStorage.setItem(BOROUGH, borough);
        AsyncStorage.setItem(HOUR, hour);
        AsyncStorage.setItem(TYPE_OF_PUBLIC, type_of_public);
        AsyncStorage.setItem(CATEGORY, category);
        AsyncStorage.setItem(COST, cost.toString());
    } catch (error) {
        console.log("Guardando info usuario | error")
    }

}

export const setEventData = async () => {
    try {
        let event_id = await getEventID()
        const API_ACTUAL_EVENT = `${API_EVENTS}/${event_id}`;
        console.log("set event data url: " + API_ACTUAL_EVENT)
        let response = await fetch(API_ACTUAL_EVENT, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
            }),
        });
        let res = await response.json();
        storeEventData(
            res.id,
            res.name,
            res.description,
            res.address,
            res.borough,
            res.date_of_event,
            res.cost,
            res.type_of_public,
            res.category,
        )
        return response
    } catch (error) {
        console.log("Recibiendo info evento | error")
    }
}

export const getEventName = async () => {
    try {
        let name = await AsyncStorage.getItem(NAME);
        console.log("Recibiendo Name: " + name)
        return name
    } catch (error) {
        console.log("Recibiendo Name | error")
    }
}

export const getDescription = async () => {
    try {
        let description = await AsyncStorage.getItem(DESCRIPTION);
        console.log("Recibiendo Description: " + description)
        return description
    } catch (error) {
        console.log("Recibiendo Description | error")
    }
}

export const getAddress = async () => {
    try {
        let address = await AsyncStorage.getItem(ADDRESS);
        console.log("Recibiendo Address: " + address)
        return address
    } catch (error) {
        console.log("Recibiendo Address | error")
    }
}

export const getBorough = async () => {
    try {
        let borough = await AsyncStorage.getItem(BOROUGH);
        console.log("Recibiendo Borough: " + borough)
        return borough
    } catch (error) {
        console.log("Recibiendo Borough | error")
    }
}

export const getHour = async () => {
    try {
        let hour = await AsyncStorage.getItem(HOUR);
        console.log("Recibiendo Hour: " + hour)
        return hour
    } catch (error) {
        console.log("Recibiendo Hour | error")
    }
}

export const getCost = async () => {
    try {
        let cost = await AsyncStorage.getItem(COST);
        console.log("Recibiendo Cost: " + cost)
        return cost
    } catch (error) {
        console.log("Recibiendo Cost | error")
    }
}

export const getTypeofpublic = async () => {
    try {
        let type_of_public = await AsyncStorage.getItem(TYPE_OF_PUBLIC);
        console.log("Recibiendo Type of public: " + type_of_public)
        return type_of_public
    } catch (error) {
        console.log("Recibiendo Type of public | error")
    }
}

export const getCategory = async () => {
    try {
        let category = await AsyncStorage.getItem(CATEGORY);
        console.log("Recibiendo Category: " + category)
        return category
    } catch (error) {
        console.log("Recibiendo Category | error")
    }
}

export const getOwner = async () => {
    try {
        let owner = await AsyncStorage.getItem(OWNER);
        console.log("Recibiendo Owner: " + owner)
        return owner
    } catch (error) {
        console.log("Recibiendo Owner | error")
    }
}