import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet
} from 'react-native';
import ParaNavigator from './ParaNavigator';
import LoginScreen from './LoginScreen';
import { getAuthState } from './actions';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDt78T31-TosjoL5OezCZygZ6DOrtukiy8",
  authDomain: "paramap-141614.firebaseapp.com",
  databaseURL: "https://paramap-141614.firebaseio.com",
  storageBucket: "paramap-141614.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.isLoggedIn){
      return <LoginScreen />
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
  isLoggedIn: state.isAuthenticated || state.user.hasSkippedLogin
});

;
export default connect(mapPropsToState)(App);




