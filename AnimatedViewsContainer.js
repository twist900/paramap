import React from 'react';
import AnimatedViews from './AnimatedViews';
import { connect } from 'react-redux';
import { selectPlace } from './actions';

const mapStateToProps = (state) => ({
    places: state.nearbyPlaces
  });

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPlaceClick(placeId){
    dispatch(selectPlace(placeId));
    ownProps.navigator.push({
      name: 'placeDetailView'
    });
  }
})

const AnimatedViewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedViews);

export default AnimatedViewsContainer;
