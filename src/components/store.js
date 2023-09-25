// store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './reducer'; // Import your reducer(s)

const rootReducer = combineReducers({
  auth: authReducer, // Use auth as the key for the authReducer
  // Add other reducers if needed
});

const store = createStore(rootReducer);

export default store;