import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { API_SIGN_UP } from '../config/const';
import { getToken } from './login';
import { getID} from './home';

export const editInfo = async (body) => {
    const user_id = await getID();
    const API_SIGN_UP_USER = `${API_SIGN_UP}/${user_id}`;
    return fetch(API_SIGN_UP_USER, {
        method: 'PUT',
        headers: new Headers({
            "Authorization": 'Bearer ' + await getToken(),
            'Content-Type': 'application/json',
        }),
        body: body
    })
        .then((res) => {
            return res;
        })
}

export const editNotifications = async (notifications) => {
    let body = JSON.stringify({
        "notifications": notifications,
    })
    editInfo(body)
}
