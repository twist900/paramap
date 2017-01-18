import NavButton from './NavButton';
import React from 'react';
import {
	StyleSheet,
	Text
} from 'react-native';

let NavRouteMapper = {
	LeftButton: function(route, navigator, index, navState) {
		switch(route.name) {
			case 'placeDetailView':
				return (
					<NavButton
						onPress={ () => {navigator.push({name: 'map'})} }
						customText='Map'
						style={styles.leftButton}
						textStyle={styles.navButtonText}
					/>
				);
			default: return null;
		}
	},

	RightButton: function(route, navigator, index, newState) {
		switch(route.name) {
			default: return null;
		}
	},

	Title:  function(route, navigator, index, navState){
		switch(route.name) {
			case 'placeDetailView':
				return (
          <Text style={styles.navTitle}>Place Details</Text>
        );
      default: return null;
		}
	}
}

export default NavRouteMapper;

const styles = StyleSheet.create({
	leftButton: {
	  paddingLeft: 10
	},
	navTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 9  // iOS
  // marginVertical: 16 // Android
  },
  navButtonText: {
    color: '#EEE',
    fontSize: 16,
    marginVertical: 10 // iOS
  // marginVertical: 16 // Android
  }
});
