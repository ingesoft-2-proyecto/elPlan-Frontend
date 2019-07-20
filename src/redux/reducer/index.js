console.log("index.js in redux/reducer initial");

import { combineReducers } from 'redux';
//import user from './user';

import searchEventsReducer from './searchEventsReducer';

export default combineReducers({
  //user,
  searchEventsReducer,
});
