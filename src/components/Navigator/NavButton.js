import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class NavButton extends React.Component{
  render(){
    return (
      <TouchableOpacity onPress={ this.props.onPress }>
        <View style={this.props.style} >
          <Text style={this.props.textStyle}>{ this.props.customText || 'Button' }</Text>
        </View>
      </TouchableOpacity>
      );
  }
}

NavButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  customText: React.PropTypes.string,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style
}
