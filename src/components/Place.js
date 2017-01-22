import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput
} from 'react-native';
import Config from 'react-native-config';
import Gallery from 'react-native-gallery';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import TabView from 'react-native-scrollable-tab-view';

import PlaceDetails from './PlaceDetails';
import PlaceComments from './PlaceComments';
import {
    PixelRatio,
} from 'react-native';

export const border = {
    width: 1 / PixelRatio.get(),
};

var screen = Dimensions.get('window');

const Place = ({ place  }) => {
  if(place == null){
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <ActivityIndicator
                size="large"
                animating={true} />
        </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
        <PlaceDetails place={place} tabLabel="Details" />
    </ScrollView>
  );
}

Place.propTypes = {
  place: React.PropTypes.object
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  galleryContainer: {
    height: screen.height / 1.8
  },
  gallery: {
    backgroundColor: 'black'
  },
  reviewButton: {
    backgroundColor: '#5AD427',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    backgroundColor: '#F7F7F7',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15
  },
  nameText: {
    fontSize: 40,
    fontFamily: 'Helvetica-Bold'
  },
  addressContainer: {
    backgroundColor: '#F7F7F7',
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Helvetica',
  },
  topAndBottom: {
    borderTopColor: '#d8d8d8',
    borderTopWidth: border.width,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: border.width,
  },

  judgementArea: {
         marginTop: 10,
         backgroundColor: '#FFF',
         padding: 12
     },
});



export default Place;
