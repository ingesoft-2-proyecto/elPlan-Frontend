
import { combineReducers } from 'redux';

import nav from './nav';
import user from './user';
import searchPriceReducer from '../redux/reducer/searchPriceReducer';

export default combineReducers({
  nav,
  user,
  searchPriceReducer,
});
