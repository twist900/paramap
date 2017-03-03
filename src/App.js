import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Navigator,
  Text,
  Platform
} from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { fetchNearbyPlaces } from './actions';

import Login from './scenes/Login';
import ParaMap from './scenes/ParaMap';
import Place from './scenes/Place';
import ReviewListModal from './components/ReviewListModal';
import ReviewModal from './scenes/ReviewModal';
import ParaList from './scenes/ParaList';
import FiltersModal from './scenes/FiltersModal';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchNearbyPlaces(this.props.currentType));
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
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            animating={true} />
        </View>
      );
    }

    const Navbar = Platform.select({
      ios: () => {},
      android: () => require('./components/Navbar.android').default,
    })();

    return (
      <Router>
        <Scene key="root" navBar={Navbar}>
          <Scene key="placeList"
            component={ParaList}
            title={this.props.currentType}
            initial={true}
            renderLeftButton={() => this.renderFilterButton()}
            renderRightButton={() => this.renderMapButton()}
            leftIconAndroid='menu'
            rightIconAndroid='map'
            onLeftPressAndroid={() => Actions.filters()}
            onRightPressAndroid={() => Actions.map()}
          />
          <Scene key="map"
            component={ParaMap}
            title="Map"
            leftIconAndroid='arrow-back'
            onLeftPressAndroid={() => Actions.placeList()}
          />
          <Scene key="filters" direction="vertical" hideNavBar={true} component={FiltersModal} />
          <Scene
            key="placeDetails"
            component={Place} title="Details"
            leftIconAndroid='arrow-back'
            onLeftPressAndroid={() => Actions.pop()}
          />
          <Scene key="reviewListModal" direction="vertical" hideNavBar={true} component={ReviewListModal} />
          <Scene key="reviewModal" direction="vertical" hideNavBar={true} component={ReviewModal} />
        </Scene>
      </Router>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

const mapPropsToState = (state) => ({
  showLoginScreen: !state.user.skippedAuth && !state.user.facebookToken,
  isLoading: state.isLoading,
  nearbyPlaces: state.nearbyPlaces,
  user: state.user,
  currentType: state.currentType,
  state: state
});

export default connect(mapPropsToState)(App);
