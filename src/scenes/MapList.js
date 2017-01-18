import React from 'react';
import AnimatedViews from '../components/AnimatedViews';
import { connect } from 'react-redux';
import { selectPlace } from '../actions';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => ({
    places: state.nearbyPlaces,
    isLoading: state.isLoading
  });

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPlaceClick(placeId){
    dispatch(selectPlace(placeId));
    Actions.placeDetails();
  }
})

const MapList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedViews);

export default MapList;
