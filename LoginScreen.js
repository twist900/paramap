import React from 'react';
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet
 } from 'react-native';

export default class LoginScreen extends React.Component{

  render(){
    return (
      <Image
        source={require('./img/login_background.jpg')}
        style={styles.container}
      >
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content" />
        <TouchableOpacity
          accessabilityLabel="Skip Login"
          accessabilityTrait="button"
          style={styles.skip}
          onPress={() => this.props.skipLogin()}
        >
          <Image
            source={require('./img/x.png')}
          />
        </TouchableOpacity>


      </Image>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    width: undefined,
    height: undefined,
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
})