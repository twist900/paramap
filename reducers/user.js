import {
  LOGGED_IN,
  SKIPPED_LOGIN
} from '../actions';

const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
}

export default function user(state = initialState, action){
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

