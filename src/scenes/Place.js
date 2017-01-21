import react from 'react';
import PlaceScreen from '../components/Place';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  place: state.selectedPlace,
});

const Place = connect(mapStateToProps)(PlaceScreen);

export default Place;
