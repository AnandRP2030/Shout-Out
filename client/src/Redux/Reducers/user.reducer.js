import { NEW_ACTIVE_USER } from "../ActionTypes/tweetActionTypes";
import axios from 'axios';
import { store } from "../store";

export const initializeUser = ()  => {
    return async (dispatch) => {
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const GET_USERDETAILS_URL = `${BASE_URL}/user/user-details`;
            let token = localStorage.getItem("token") || "";
            if (token) {
              token = token.replaceAll('"', "");
              let res = await axios.get(GET_USERDETAILS_URL, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const userDetails = res.data;
              dispatch({
                type: NEW_ACTIVE_USER,
                payload: userDetails,
              });
            }
        }catch (error) {
            console.log('Error fetching user details..', error);
        }   
    }
}

let initialState = {
    username: "",
    name: "",
    profilePicture: ""
}


function userReducer  (state = initialState, action) {
    if (action.type === NEW_ACTIVE_USER) {
        const {name, username, profilePicture} = action.payload;
        
        return {
            ...state,
            name, 
            username,
            profilePicture
        }
    }
    return state;
}

export {userReducer}