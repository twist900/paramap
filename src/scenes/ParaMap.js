import React from 'react';
import MapView from '../components/ParaMap';
import { connect } from 'react-redux';
import { selectPlace } from '../actions';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => ({
    places: state.nearbyPlaces,
    currentPosition: state.currentPosition,
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
)(MapView);

export default MapList;
