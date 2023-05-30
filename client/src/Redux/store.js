import {configureStore, applyMiddleware} from '@reduxjs/toolkit';
import { tweetsReducer } from './Reducers/tweet.reducer.js';
import { combineReducers } from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';

const logger = createLogger();

const store = configureStore({
    reducer: {
        tweets: tweetsReducer
    }
}, applyMiddleware(logger));

// console.log(applyMiddleware)
// console.log('current state',store.getState());

export {store}