import { COMMENT_BOX_EVENT } from "../ActionTypes/tweetActionTypes";
const initialState = {commentBoxOpen: false}

function commentsReducer (state = initialState, action) {
    if (action.type === COMMENT_BOX_EVENT) {
        let currentAction = true;
        if (state.commentBoxOpen) {
            currentAction = false;
        }
        return {
            ...state,
            commentBoxOpen: currentAction
        }
    }
    return state;
}

export {commentsReducer};