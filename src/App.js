import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
  ActivityIndicator,
  Navigator
} from 'react-native';
import { Scene, Router, Schema } from 'react-native-router-flux';

import { setCurrentPosition, toggleLoading, setSkippedLogin, setAuthState } from './actions';

import Login from './scenes/Login';
import MapList from './scenes/MapList';
import Place from './scenes/Place';
import ReviewListModal from './components/ReviewListModal';
import ReviewModal from './scenes/ReviewModal';

import {
  AccessToken
} from 'react-native-fbsdk';

class App extends Component {
	constructor(props) {
		super(props);
	}

  componentWillMount() {
    this.setCurrentPosition();
  }

  setCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      initialPosition => this.props.dispatch(setCurrentPosition(initialPosition.coords)),
      error => alert(error.message)
    );
  }

	render() {
		if(this.props.showLoginScreen) {
      return <Login />
		}

    if(this.props.isLoading || (this.props.nearbyPlaces.length == 0)){
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <ActivityIndicator
            size="large"
            animating={true} />
        </View>
      );
    }

		return (
        <Router>
     			<Scene key="root">
     				<Scene key="map" showNavigationBar={false} component={MapList} title="Map" initial={true} />
     				<Scene key="placeDetails"  component={Place} title="Details" />
            <Scene key="reviewListModal" direction="vertical" hideNavBar={true} component={ReviewListModal} />
     			  <Scene key="reviewModal" direction="vertical" hideNavBar={true} component={ReviewModal} />
          </Scene>
        </Router>
   	);
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapPropsToState = (state) => ({
  showLoginScreen: !state.user.skippedAuth && !state.user.facebookToken,
  isLoading: state.isLoading,
  nearbyPlaces: state.nearbyPlaces,
  user: state.user
});

// ;
export default connect(mapPropsToState)(App);
