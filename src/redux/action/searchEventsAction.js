console.log("searchEventsAction.js in redux redux/action --------------------------");

import { AsyncStorage } from 'react-native';
import { API } from '../../config/const'
import { dataStructureEvent } from '../../utils/searchEvents'

export const SET_SEARCH_EVENTS = 'SET_SEARCH_EVENTS'
//var END_POINT_EVENTS =  getEndpoint();

export function setSearchEvents (events) {
  return {
    type: SET_SEARCH_EVENTS,
    events
  }
}

export function getSearchEvents (events) {
  return (dispatch) => {
    let endpoint = window.events;
    console.log("Endpoint al cual se realizara la peticion: " + API + "/" + endpoint);
    console.log("searchEventsAction.js in redux redux/action -- obteniendo datos");
    return fetch(`${API}/${endpoint}`, {
        method: methodHttp(endpoint),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: bodyRequest(endpoint)
    })
    .then(response => response.json())
    .then( json => {
      console.log("getSearchEvents", json);

      dispatch(setSearchEvents(dataStructureEvent(json)));
    })
    .catch(e => alert(e));
  }
}

function methodHttp(endpoint){
  switch (endpoint) {
  case "events":
    return 'GET';
    break;
  case "statistic_cost":
    return 'POST';
    break;
  default:
    return 'GET';
  }
}

function bodyRequest(endpoint){
  switch (endpoint) {
  case "events":
    return null;
    break;
  case "statistic_cost":
    return JSON.stringify( {
      "cost": "5.6"
    })
    break;
  default:
    return 'GET';
  }
}
