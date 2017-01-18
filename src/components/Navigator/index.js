import React from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';
import AnimatedViewsContainer from '../../containers/AnimatedViewsContainer';
import PlaceScreenContainer from '../../containers/PlaceScreenContainer';
import NavRouteMapper from './NavRouteMapper';

export default class ParaNavigator extends React.Component{
  constructor(props){
    super(props);
  }

  renderScene(route, navigator){
    switch(route.name){
      case 'placeDetailView':
        return (
          <PlaceScreenContainer navigator={navigator} />
        );
      default:
        return (
          <AnimatedViewsContainer navigator={navigator} />
        )
    }
  }
  render(){
    return (
      <Navigator
        initialRoute={{ name: 'map', index: 0}}
        ref="navigator"
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1
  },
});
