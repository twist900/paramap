import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
  ActivityIndicator,
  Navigator,
  Text
} from 'react-native';
import { Scene, Router, Schema, Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { setCurrentPosition, toggleLoading, setSkippedLogin, setAuthState } from './actions';

import Login from './scenes/Login';
import ParaMap from './scenes/ParaMap';
import Place from './scenes/Place';
import ReviewListModal from './components/ReviewListModal';
import ReviewModal from './scenes/ReviewModal';
import ParaList from './scenes/ParaList';
import FiltersModal from './scenes/FiltersModal';

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

  renderMapButton() {
    return (
      <Button onPress={() => Actions.map()}>
        <Icon name="ios-map-outline" size={25} color="#a3a3a3" />
      </Button>
    );
  }

  renderFilterButton() {
    return (
      <Button onPress={() => Actions.filters()}>
        <Icon name="ios-funnel-outline" size={25} color="#a3a3a3" />
      </Button>
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
          <Scene key="placeList" component={ParaList} title="List" initial={true} renderLeftButton={() => this.renderFilterButton()} renderRightButton={() => this.renderMapButton()}/>
   				<Scene key="map" component={ParaMap} title="Map" />
   				<Scene key="filters" direction="vertical" hideNavBar={true} component={FiltersModal} />
          <Scene key="placeDetails" component={Place} title="Details" />
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
