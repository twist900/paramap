import react from 'react';
import PlaceScreen from '../components/PlaceScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  place: state.selectedPlace,
});

const PlaceScreenContainer = connect(mapStateToProps)(PlaceScreen);

export default PlaceScreenContainer;