import { combineReducers } from 'redux';
import {
  SELECT_PLACE,
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

function selectedPlaceId(state = '', action){
  switch(action.type){
    case SELECT_PLACE:
      return action.placeId;
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
      amount: 99,
      geometry: {
        location: {
          lat: LATITUDE,
          lng: LONGITUDE,
        }
      },
    },
    {
      place_id: 1,
      amount: 109,
      geometry: {
        location: {
          lat: LATITUDE,
          lng: LONGITUDE,
        }
      }
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
  selectedPlaceId,
  nearbyPlaces
});

export default rootReducer;
