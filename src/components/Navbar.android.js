import React, { Component } from 'react';
import { PropTypes, Text, View } from 'react-native';
import { Toolbar } from 'react-native-material-design';
import { NavBar, Actions } from 'react-native-router-flux';

export default class Navbar extends NavBar {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar
        title={this.props.title }
        icon={ this.props.leftIconAndroid }
        onIconPress={ this.props.onLeftPressAndroid }
        primary='paperTeal'
        actions={this.props.rightIconAndroid && [{
            icon: this.props.rightIconAndroid,
            onPress: this.props.onRightPressAndroid
        }]}
      />
    );
  }
}
