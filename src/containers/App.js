import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet
} from 'react-native';
import * as firebase from 'firebase';
import { setSkippedLogin } from '../actions'
import LoginScreen from '../components/LoginScreen';
import ParaNavigator from '../components/ParaNavigator';

var firebaseConfig = {
  apiKey: "AIzaSyDt78T31-TosjoL5OezCZygZ6DOrtukiy8",
  authDomain: "paramap-141614.firebaseapp.com",
  databaseURL: "https://paramap-141614.firebaseio.com",
  storageBucket: "paramap-141614.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
	constructor(props) {
		super(props);
	}

	skipLogin() {
	  this.props.dispatch(setSkippedLogin());
	}

	render() {
		if(!this.props.hasSkippedLogin) {
			return <LoginScreen skipLogin={this.skipLogin.bind(this)}/>
		}

		return (
     	<View style={styles.container}>
     	  <ParaNavigator />
     	</View>
   	);
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapPropsToState = (state) => ({
  // isLoggedIn: state.isAuthenticated || state.user.hasSkippedLogin
  isLoggedIn: false,
  hasSkippedLogin: true
});

// ;
export default connect(mapPropsToState)(App);
