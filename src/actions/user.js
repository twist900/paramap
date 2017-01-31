import {
  GraphRequest,
  GraphRequestManager,
  AccessToken
} from 'react-native-fbsdk';

import { facebookLoginAPI, getFacebookInfoAPI } from '../services/facebook'
import { firebaseFacebookAuth, postProfile } from '../services/firebase';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const SKIPPED_AUTH = 'SKIPPED_AUTH';
export const LOGOUT = 'LOGOUT';
export const FIREBASE_AUTH_FACEBOOK = 'FIREBASE_AUTH_FACEBOOK';

export const setSkippedAuth = () => ({
  type: SKIPPED_AUTH
});

export const authSuccess = (facebookToken, facebookProfile, serverAuthToken) => {
  return {
    type: AUTH_SUCCESS,
    facebookToken,
    facebookProfile
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

const setFirebaseFacebookAuth = (facebookToken, profile) => {
  return dispatch => {
    firebaseFacebookAuth(facebookToken)
      .then((credentials) => {
        dispatch({
          type: FIREBASE_AUTH_FACEBOOK,
          credentials
        });
        postProfile(credentials.user.uid, profile)
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const facebookLogin = () => {
  return (dispatch) => {
    const successValues = [];
    facebookLoginAPI()
    .then((facebookAuthResult) => {
      successValues.push(facebookAuthResult.accessToken);
      return getFacebookInfoAPI(facebookAuthResult.accessToken);
    })
    .then((facebookProfile) => {
      successValues.push(facebookProfile);
      dispatch(setFirebaseFacebookAuth(successValues[0], facebookProfile));
      dispatch(authSuccess(...successValues));
    })
    .catch((error) => {
      console.log(error);
    });
  };
};


