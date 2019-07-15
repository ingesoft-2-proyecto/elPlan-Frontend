
import { combineReducers } from 'redux';

import nav from './nav';
import user from './user';
import event from './event';

export default combineReducers({
  nav,
  user,
  event,
});
