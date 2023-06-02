import {NEW_TWEET_ADDED, TWEET_DELETED, TWEET_EDITED} from "../ActionTypes/tweetActionTypes.js";
import {store} from "../store.js";

const initialState = {newTweetsCount: 0};


function tweetsReducer(state = initialState, action) {
    if (action.type === NEW_TWEET_ADDED){
        return {
            ...state,
            newTweetsCount: state.newTweetsCount + 1
        }
    }else if (action.type === TWEET_DELETED) {
        return {
            ...state, 
            newTweetsCount: state.newTweetsCount - 1
        }
    }else if (action.type === TWEET_EDITED) {
        return {
            ...state, 
            newTweetsCount: state.newTweetsCount + 1

        }
    }

    return state;
}


export {tweetsReducer}