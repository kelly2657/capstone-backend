////////////////////
// 루트 리듀서

import { combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
