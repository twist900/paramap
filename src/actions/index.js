import Config from 'react-native-config';

export const REQUEST_PLACES = 'REQUEST_PLACES';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SET_PLACE_DETAILS = 'SET_PLACE_DETAILS';
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SUBMIT_REVIEW = 'SUBMIT_REVIEW';

import * as firebase from 'firebase';
import { getPlaceRatings, getPlaceReviews, postPlaceReview } from '../services/firebase';
import { getPlaceDetails } from '../services/google';
import { calcRatings } from '../utils/ratings';

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
	  Promise.all([
	  	getPlaceRatings(placeId),
	  	getPlaceReviews(placeId),
	  	getPlaceDetails(placeId)
	  ]).then(([ratings, reviews, details]) => {
	  	if(Config.USE_STUBBED_DATA == 'true') {
		  	details = require('../../data/placeDetails.js').default
		  }
		  let ratingRes = calcRatings(ratings);
		  let place = {
		  	ratings,
		  	ratingRes,
		  	details,
		  	reviews
		  };
		  place.id = placeId;
	  	dispatch(setPlaceDetails(place));
	  }).catch(error => console.log(error));
	}
}

export const setPlaceDetails = (place) => ({
	type: SET_PLACE_DETAILS,
	place: place
});

export const submitReview = (placeId, review) => {
	return dispatch => {
		postPlaceReview(placeId, review)
			.then((res) => {
				review.id = res.name[0];
				dispatch({
					type: SUBMIT_REVIEW,
					review
				})
			})
			.catch((error) => { this.setState({text: error}) })
	}
};

import {
	setSkippedAuth,
	authSuccess,
	logout,
	facebookLogin
} from './user';

export {
	setSkippedAuth,
	authSuccess,
	logout,
	facebookLogin
};

