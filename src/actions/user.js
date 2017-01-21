import {
  GraphRequest,
  GraphRequestManager,
  AccessToken
} from 'react-native-fbsdk';

import { facebookLoginAPI, getFacebookInfoAPI } from '../services/facebook'

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const SKIPPED_AUTH = 'SKIPPED_AUTH';
export const LOGOUT = 'LOGOUT';

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
      dispatch(authSuccess(...successValues));
    })
    .catch((error) => {
      dispatch(authFailure(error));
      setTimeout(() => {
        dispatch(authFailureRemove());
      }, 4000);
    });
  };
};


