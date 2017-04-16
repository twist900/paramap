import {
  getPlaceRatings,
  getPlaceReviews,
  postPlaceReview,
  postPlaceRating
} from "../services/firebase";
import { getPlaceDetails, getNearbyPlaces } from "../services/google";
import { calcRatings } from "../utils/ratings";

export const REQUEST_PLACES = "REQUEST_PLACES";
export const RECEIVE_PLACES = "RECEIVE_PLACES";
export const SELECT_PLACE = "SELECT_PLACE";
export const SET_PLACE_DETAILS = "SET_PLACE_DETAILS";
export const SET_CURRENT_POSITION = "SET_CURRENT_POSITION";
export const SET_PLACE_TYPE = "SET_PLACE_TYPE";

export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const SUBMIT_REVIEW = "SUBMIT_REVIEW";
export const SYNC_PLACE_RATINGS = "SYNC_PLACE_RATINGS";

export const toggleLoading = isLoading => ({
  type: TOGGLE_LOADING,
  isLoading
});

export const requestPlaces = () => ({
  type: REQUEST_PLACES
});

export const receivePlaces = json => dispatch => {
  dispatch({
    type: RECEIVE_PLACES,
    places: Array.from(json.results)
  });
  dispatch(toggleLoading(false));
};

export const fetchNearbyPlaces = placeType => {
  return dispatch => {
    dispatch(toggleLoading(true));
    dispatch(requestPlaces);

    getNearbyPlaces(placeType)
      .then(response => response.json())
      .then(json => dispatch(receivePlaces(json)))
      .catch(error => console.log(error));
  };
};

export const selectPlace = placeId => {
  return dispatch => {
    dispatch(toggleLoading(true));
    Promise.all([
      getPlaceRatings(placeId),
      getPlaceReviews(placeId),
      getPlaceDetails(placeId)
    ])
      .then(([ratings, reviews, placeDetails]) => {
        let ratingRes = calcRatings(ratings);
        let details = placeDetails.result;
        let place = {
          ratings,
          ratingRes,
          details,
          reviews
        };
        place.id = placeId;
        dispatch(setPlaceDetails(place));
      })
      .catch(error => {
        console.log(error);
      });
    dispatch(toggleLoading(false));
  };
};

export const syncPlaceRatings = placeId => {
  return dispatch => {
    getPlaceRatings(placeId)
      .then(ratings => {
        let ratingRes = calcRatings(ratings);
        dispatch({
          type: SYNC_PLACE_RATINGS,
          ratings: ratings,
          ratingRes: ratingRes
        });
      })
      .catch(error => console.log(error));
  };
};

export const setPlaceDetails = place => ({
  type: SET_PLACE_DETAILS,
  place: place
});

export const submitReview = (placeId, review) => {
  return dispatch => {
    postPlaceReview(placeId, review)
      .then(res => {
        review.id = res.name[0];
        dispatch({
          type: SUBMIT_REVIEW,
          review
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const submitRating = (placeId, rating) => {
  return dispatch => {
    postPlaceRating(placeId, rating)
      .then(res => {
        rating.id = res.name[0];
        dispatch(syncPlaceRatings(placeId));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setPlaceSearchType = (human_type, google_type) => {
  return dispatch => {
    dispatch({
      type: SET_PLACE_TYPE,
      placeType: human_type
    });
    dispatch(fetchNearbyPlaces(google_type));
  };
};

import { setSkippedAuth, authSuccess, logout, facebookLogin } from "./user";

export { setSkippedAuth, authSuccess, logout, facebookLogin };
