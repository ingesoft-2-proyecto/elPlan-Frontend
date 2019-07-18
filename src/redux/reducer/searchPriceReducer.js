import { SET_SEARCH_EVENTS_PRICE } from '../../utils/postSearchPrice';
const initialState = {
  events: []
};

export default function(state = initialState, action){
  if (action.type === SET_SEARCH_EVENTS_PRICE) {
    return {
      ...state,
      events: action.events
    }
  }

  return state;
}
