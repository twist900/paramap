import React from 'react';
import AnimatedViews from './AnimatedViews';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    places: state.nearbyPlaces
  }
};

const App = connect(mapStateToProps)(AnimatedViews);
export default App;
