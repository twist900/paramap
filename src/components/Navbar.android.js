import React from "react";
import { Toolbar } from "react-native-material-design";
import { NavBar } from "react-native-router-flux";

export default class Navbar extends NavBar {
  render() {
    return (
      <Toolbar
        title={this.props.title}
        icon={this.props.leftIconAndroid}
        onIconPress={this.props.onLeftPressAndroid}
        primary="paperTeal"
        actions={
          this.props.rightIconAndroid && [
            {
              icon: this.props.rightIconAndroid,
              onPress: this.props.onRightPressAndroid
            }
          ]
        }
      />
    );
  }
}
