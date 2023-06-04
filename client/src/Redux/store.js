import {configureStore, applyMiddleware} from '@reduxjs/toolkit';
import { tweetsReducer } from './Reducers/tweet.reducer.js';
import { combineReducers } from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import { commentsReducer } from './Reducers/comment.reducer.js';

const logger = createLogger();

const store = configureStore({
    reducer: {
        tweets: tweetsReducer,
        comments: commentsReducer
    }
}, applyMiddleware(logger));

// console.log(applyMiddleware)
// console.log('current state',store.getState());

export {store}