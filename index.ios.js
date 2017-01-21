/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import App from './src/App';
import configureStore from './src/store/configureStore';
const store = configureStore();

var firebaseConfig = {
  apiKey: "AIzaSyDt78T31-TosjoL5OezCZygZ6DOrtukiy8",
  authDomain: "paramap-141614.firebaseapp.com",
  databaseURL: "https://paramap-141614.firebaseio.com",
  storageBucket: "paramap-141614.appspot.com",
  messagingSenderId: "999427862566"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class paramap extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('paramap', () => paramap);
