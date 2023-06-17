import { COMMENT_BOX_EVENT } from "../ActionTypes/tweetActionTypes";
const initialState = { commentBoxOpen: false };

function commentsReducer(state = initialState, action) {
  if (action.type === COMMENT_BOX_EVENT) {
    return {
      ...state,
      commentBoxOpen: !state.commentBoxOpen,
    };
  }
  return state;
}

export { commentsReducer };
