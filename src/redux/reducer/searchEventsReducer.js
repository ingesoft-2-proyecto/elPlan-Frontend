console.log("searchEventsReducer.js in redux redux/reducer");

import { SET_SEARCH_EVENTS } from '../action/searchEventsAction';
const initialState = {
  events: []
};

export default function(state = initialState, action){
  if (action.type === SET_SEARCH_EVENTS) {
    return {
      ...state,
      events: action.events
    }
  }

  return state;
}
