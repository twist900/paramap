import React from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';
import AnimatedViewsContainer from './AnimatedViewsContainer';

export default class ParaNavigator extends React.Component{
  constructor(props){
    super(props);
  }

  renderScene(route, nav){
    switch(route){
      default: return ( <AnimatedViewsContainer />)
    }
  }
  render(){
    return (
      <Navigator
        initialRoute={{ name: 'map' }}
        ref={(nav) => this.nav = nav}
        renderScene={this.renderScene.bind(this)}
      />

      );
  }
}
