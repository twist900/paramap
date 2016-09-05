import react from 'react';
import PlaceScreen from './PlaceScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  place: state.selectedPlace
});

const PlaceScreenContainer = connect(mapStateToProps)(PlaceScreen);

export default PlaceScreenContainer;