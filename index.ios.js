/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import {
  getAuthState,
  setCurrentPosition
 } from './actions'

let store = configureStore();
store.dispatch(getAuthState());

console.log(store.getState());

class Paramap extends React.Component {
  constructor(props){
    super(props);
    this.setCurrentPosition();
  }

  setCurrentPosition(){
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => store.dispatch(setCurrentPosition(initialPosition.coords)) ,
      (error) => alert(error.message)
    );
  }

  render() {
    return (
    <Provider store={store}>
      <App />
    </Provider>
    );
  }
}

AppRegistry.registerComponent('Paramap', () => Paramap);
