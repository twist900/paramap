import { combineReducers } from 'redux';
import {
  SELECT_PLACE,
  SET_PLACE_DETAILS,
  REQUEST_PLACES,
  RECEIVE_PLACES,
  SET_CURRENT_POSITION } from '../actions';

var initialState = {
  selectedPlaceId: '',
  currentPosition: {
    longitude: '',
    latitude: ''
  },
  nearbyPlaces: []
};

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

function selectedPlace(state = {}, action){
  console.log(state);
  switch(action.type){
    case SET_PLACE_DETAILS:
      let place = Object.assign({}, state, { name: action.place.name});
      return place;
    default:
      return state;
  }
}

function currentPosition(state = { latitude: LATITUDE, longitude: LONGITUDE }, action){
  switch(action.type){
    case SET_CURRENT_POSITION:
      let position = Object.assign({}, state, {
        latitude: action.position.latitude,
        logitude: action.position.longitude
      });
      return position;
    default:
      return state;
  }
}

function nearbyPlaces( state = [ {
      place_id: 0,
      name: 'Duomo',
      geometry: {
        location: {
          lat: LATITUDE,
          lng: LONGITUDE,
        }
      },
      place_id: 'rwf2314sfsf'
    },
    {
      place_id: 1,
      name: 'Kremlin',
      amount: 109,
      geometry: {
        location: {
          lat: LATITUDE,
          lng: LONGITUDE,
        }
      },
      place_id: 'aahjf214dsfcs'
    },
          ], action){
  switch(action.type){
    case RECEIVE_PLACES:
      return action.places;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentPosition,
  selectedPlace,
  nearbyPlaces
});

export default rootReducer;
