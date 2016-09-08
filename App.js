import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet
} from 'react-native';
import ParaNavigator from './ParaNavigator';
import LoginScreen from './LoginScreen';
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
  isLoggedIn: state.user.isLoggedIn || state.user.hasSkippedLogin
});

;
export default connect(mapPropsToState)(App);




