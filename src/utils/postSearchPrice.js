import { API_SEARCH_EVENTS_PRICE } from '../config/const'
import { searchEventsPrice } from './searchPrice'

export const SET_SEARCH_EVENTS_PRICE = 'SET_SEARCH_EVENTS_PRICE'

export function setSearchEventsPrice (events) {
  return {
    type: SET_SEARCH_EVENTS_PRICE,
    events
  }
}

export function getSearchEventsPrice (events) {
  return (dispatch) => {
    return fetch(API_SEARCH_EVENTS_PRICE, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "cost": "5.6"
        })
    })
    .then(response => response.json())
    .then( json => {
      console.log("getSearchEventsPrice", json);

      dispatch(setSearchEventsPrice(searchEventsPrice(json)));
    })
    .catch(e => alert(e));
  }
}
