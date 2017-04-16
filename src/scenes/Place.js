import react from "react";
import PlaceScreen from "../components/Place";
import { connect } from "react-redux";
import { submitRating } from "../actions";

const mapStateToProps = state => ({
  place: state.selectedPlace,
  isLoading: state.isLoading,
  entranceRating: state.selectedPlace.ratingRes.entrance,
  bathroomRating: state.selectedPlace.ratingRes.bathroom,
  parkingRating: state.selectedPlace.ratingRes.parking
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmitRating(placeId, rating) {
    dispatch(submitRating(placeId, rating));
  }
});

const Place = connect(mapStateToProps, mapDispatchToProps)(PlaceScreen);

export default Place;
