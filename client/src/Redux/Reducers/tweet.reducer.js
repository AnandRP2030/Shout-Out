import {NEW_TWEET_ADDED} from "../ActionTypes/tweetActionTypes.js";
import {store} from "../store.js";

const initialState = {newTweetsCount: 0};


function tweetsReducer(state = initialState, action) {
    if (action.type === NEW_TWEET_ADDED){
        return {
            ...state,
            newTweetsCount: state.newTweetsCount + 1
        }
    }

    return state;
}


export {tweetsReducer}