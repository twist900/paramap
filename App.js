import React from 'react';
import AnimatedViews from './AnimatedViews';
import { connect } from 'react-redux';

// class App extends React.Component{
//   constructor(props){
//     super(props);

//     store.dispatch(fetchNearbyPlaces(''));
//   }

//   trackLocation(){
//     navigator.geolocation.getCurrentPosition(
//       (initialPosition) => this.setState({initialPosition}),
//       (error) => alert(error.message)
//     );
//   }

//   render(){
//     return (
//       <AnimatedViews places={this.props.places} />
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     places: state.nearbyPlaces
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchNearbyPlaces: () => { dispatch(fetchNearbyPlaces)}
//   }
// }

const mapStateToProps = (state) => {
  return {
    places: state.nearbyPlaces
  }
};

const App = connect(mapStateToProps)(AnimatedViews);
export default App;