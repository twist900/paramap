import Config from 'react-native-config';

export const REQUEST_PLACES = 'REQUEST_PLACES';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SET_PLACE_DETAILS = 'SET_PLACE_DETAILS';
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';
export const SKIPPED_LOGIN = 'SKIPPED_LOGIN';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

import * as firebase from 'firebase'

export const toggleLoading = (isLoading) => ({
	type: TOGGLE_LOADING,
	isLoading
});

export const requestPlaces = () => ({
    type: REQUEST_PLACES,
  });

export const receivePlaces = (json) => {
	return dispatch => {
		dispatch({
			type: RECEIVE_PLACES,
			places: Array.from(json.results)
		});
		dispatch(toggleLoading(false));
	}
};

export const setCurrentPosition = (currentPosition) => {
	return dispatch => {
		dispatch({
			type: SET_CURRENT_POSITION,
			position: currentPosition
		});
		dispatch(fetchNearbyPlaces(currentPosition));
	}
};

export const fetchNearbyPlaces = (position) => {
	return dispatch => {
		dispatch(toggleLoading(true));
		dispatch(requestPlaces);

		// As Google Places Api has a request threshold, for development purposes,
		// we use stubbed data
		if(Config.USE_STUBBED_DATA == 'true') {
			dispatch(receivePlaces({ results: require('../../data/places.js').default }));
		} else {
			var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.latitude},${position.longitude}&radius=500&key=${Config.GOOGLE_MAPS_API_KEY}`;
			return fetch(url)
				.then(response => response.json())
				.then(json => dispatch(receivePlaces(json)));

		}
	};
};

export const selectPlace = (placeId) => {
	return dispatch => {
	  if(Config.USE_STUBBED_DATA == 'true') {
		  dispatch(setPlaceDetails(require('../../data/placeDetails.js').default))
		} else {
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
		}
	}
};

export const setPlaceDetails = (place) => ({
	type: SET_PLACE_DETAILS,
	place: place
})

export const setSkippedLogin = () => ({
  type: SKIPPED_LOGIN
})


// export const getAuthState = () => {
//   return dispatch => {
//     const token = AccessToken.getCurrentAccessToken();
//     return dispatch({
//       type: SET_AUTH_STATE,
//       isAuthenticated: token != null
//     })
//   }
// }

// export const setAuthState = (isAuthenticated) => ({
//   type: SET_AUTH_STATE,
//   isAuthenticated
// })

