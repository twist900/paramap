export const REQUEST_PLACES = 'REQUEST_PLACES';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';

export function requestPlaces(){
  return {
    type: REQUEST_PLACES,
  }
}

export function receivePlaces(json){
  return {
    type: RECEIVE_PLACES,
    places: Array.from(json.results)
  }
}

export function setCurrentPosition(currentPosition){
  return (dispatch) => {
      dispatch({
          type: SET_CURRENT_POSITION,
          position: currentPosition
      });
      dispatch(fetchNearbyPlaces(currentPosition));
  }
}

export function fetchNearbyPlaces(position){
  return dispatch => {
    dispatch(requestPlaces);
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.latitude},${position.longitude}&radius=500&key=AIzaSyChSVANvkGIsB4thLxOmGskA0WhuMZmWlw`;
    return fetch(url)
          .then(response => response.json())
          .then(json => dispatch(receivePlaces(json)))
  }
}


export function selectPlace(placeId){
  return {
    type: SELECT_PLACE,
    placeId: placeId
  };
}