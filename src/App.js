import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import { setCurrentPosition, toggleLoading, setSkippedLogin } from './actions';

import LoginScreen from './components/LoginScreen';
// import ParaNavigator from './components/Navigator';
import MapList from './scenes/MapList';
import Place from './scenes/Place';

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

	skipLogin() {
	  this.props.dispatch(setSkippedLogin());
	}

	render() {
		if(!this.props.hasSkippedLogin) {
			return <LoginScreen skipLogin={this.skipLogin.bind(this)}/>
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
  isLoggedIn: state.isAuthenticated || state.user.hasSkippedLogin,
  hasSkippedLogin: state.user.hasSkippedLogin,
  isLoading: state.isLoading,
  nearbyPlaces: state.nearbyPlaces
});

// ;
export default connect(mapPropsToState)(App);
