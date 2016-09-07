import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Config from 'react-native-config';
import Gallery from 'react-native-gallery';
import MapView from 'react-native-maps';

var screen = Dimensions.get('window');

const PlaceScreen = ({ place }) => {
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
    <View style={styles.container}>
      <View style={styles.galleryContainer}>
        <Gallery
          style={styles.gallery}
          images={
            place.photos.map( (image) => {
              return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${image.photo_reference}&key=${Config.GOOGLE_MAPS_API_KEY}`;
            })
          }
        />
        <View style={styles.content}>
          <TouchableOpacity style={styles.button}  >
            <Text style={styles.buttonText}>GET DIRECTIONS</Text>
          </TouchableOpacity>
        </View>
      </View>
      <MapView
        style={styles.map}
        region={{
             latitude: 37.78825,
             longitude: -122.4324,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
           }}
      >

          <MapView.Marker
            coordinate={{
                         latitude: place.geometry.location.lat,
                         longitude:  place.geometry.location.lon
                       }}
            title={place.name}
          />
      </MapView>
    </View>
    );
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  galleryContainer: {
    height: screen.height / 2.5
  },
  gallery: {
    backgroundColor: 'black'
  },
  content: {
    padding: 15
  },
  button: {
    backgroundColor: '#05A9D6',
    borderRadius: 28,
    width: 200,
    padding: 16,
    alignSelf: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  map: {
    flex: 1
  }
});

export default PlaceScreen;