console.log("configureStore.js in redux initial");

import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducer';

export default function configureStore(onCompletion) {
  console.log("configureStore.js in redux configureStore()");
  const enhancer = compose(
    applyMiddleware(thunk),
  );

  const store = createStore(reducer, enhancer);
  console.log("configureStore.js in redux createStore()");
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
