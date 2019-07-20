import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_SIGN_UP } from '../config/const';
import { getToken } from './login';
import { getID} from './home';

export const editInfo = async (body) => {
    try {
        let user_id = await getID();
        console.log("Soy el id para notifications: " + user_id)
        const API_SIGN_UP_USER = `${API_SIGN_UP}/${user_id}`;
        let response = await fetch(API_SIGN_UP_USER, {
            method: 'PUT',
            headers: new Headers({
                "Authorization": 'Bearer ' + await getToken(),
                'Content-Type': 'application/json',
            }),
            body: body
        });
    } catch (error) {
        console.log("edit info fail")
    }
    
}

export const editNotifications = async (notifications) => {
    let body = JSON.stringify({
        "notifications": notifications,
    })
    editInfo(body)
}
