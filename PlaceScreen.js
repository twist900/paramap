import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const PlaceScreen = ({ place }) => {
  return ( <View style={styles.container}>
    <Text>
      {place.name}
    </Text>
  </View> );
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default PlaceScreen;