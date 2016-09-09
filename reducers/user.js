import {
  LOGGED_IN,
  SKIPPED_LOGIN,
  SET_AUTH_STATE
} from '../actions';

const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
}

export function user(state = initialState, action){
  switch(action.type){
    case LOGGED_IN:
      return {
        isLoggedIn: true,
        hasSkippedLogin: false
      };
    case SKIPPED_LOGIN:
      return {
        isLoggedIn: false,
        hasSkippedLogin: true
      };
    default:
      return state;
  }
}

export function isAuthenticated(state = false, action){
  switch(action.type){
    case SET_AUTH_STATE:
      return action.isAuthenticated;
    default:
      return state;
  }
}