import Config from 'react-native-config';
import { AccessToken } from 'react-native-fbsdk';
export const REQUEST_PLACES = 'REQUEST_PLACES';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SET_PLACE_DETAILS = 'SET_PLACE_DETAILS';
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';
import * as firebase from 'firebase'

export const requestPlaces = () => ({
    type: REQUEST_PLACES,
  });

export const receivePlaces = (json) =>  ({
    type: RECEIVE_PLACES,
    places: Array.from(json.results)
  });

export const setCurrentPosition = (currentPosition) => {
  return (dispatch) => {
      dispatch({
          type: SET_CURRENT_POSITION,
          position: currentPosition
      });
      dispatch(fetchNearbyPlaces(currentPosition));
  };
};

export const fetchNearbyPlaces = (position) => {
  return dispatch => {
    dispatch(requestPlaces);
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.latitude},${position.longitude}&radius=500&key=${Config.GOOGLE_MAPS_API_KEY}`;
    return fetch(url)
          .then(response => response.json())
          .then(json => dispatch(receivePlaces(json)))
  };
};


export const selectPlace = (placeId) => {
  return dispatch => {
    var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${Config.GOOGLE_MAPS_API_KEY}`
    return fetch(url)
           .then(response => response.json())
           .then(json => {
              const ref = firebase.database().ref().child('ratings').child(placeId);
              ref.on("value", (snapshot) => {
                console.log(snapshot.val());
                dispatch(setPlaceDetails(json.result))
              }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
              });

           });
  };
};

export const setPlaceDetails = (place) => {
  return {
    type: SET_PLACE_DETAILS,
    place: place
  }
}

export const getAuthState = () => {
  return dispatch => {
    const token = AccessToken.getCurrentAccessToken();
    return dispatch({
      type: SET_AUTH_STATE,
      isAuthenticated: token != null
    })
  }
}

export const setAuthState = (isAuthenticated) => ({
  type: SET_AUTH_STATE,
  isAuthenticated
})