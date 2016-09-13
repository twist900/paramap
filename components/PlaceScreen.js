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

import {
    PixelRatio,
} from 'react-native';

export const border = {
    width: 1 / PixelRatio.get(),
};

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
   <ScrollView contentContainerStyle={styles.container}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.1)"
        barStyle="light-content" />

      <View style={styles.galleryContainer}>
        <Gallery
          style={styles.gallery}
          images={
            place.photos.map( (image) => {
              return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${image.photo_reference}&key=${Config.GOOGLE_MAPS_API_KEY}`;
            })
          }
        />
      </View>


        <TouchableOpacity style={styles.reviewButton}  >
         <Icon style={styles.buttonContent} name="thumbs-up" size={20} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.leaveAReview}>
          <Text>Rate this Place</Text>
        </View>

        <View style={[styles.topAndBottom, styles.judgementArea]}>
          <View style={styles.ratingStar}>
            <Text style={{fontSize: 16, marginRight: 10}}>Entry</Text>
            <StarRating
                selectedStar={(rating)=> {}}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                starColor='#D3E02E'
                starSize={30}
                maxStars={5}
                rating={3.5} />
            <Text style={styles.ratingText}>Entry</Text>
          </View>
        </View>

        <View style={[styles.topAndBottom, styles.judgementArea]}>
          <View style={styles.ratingStar}>
            <Text style={{fontSize: 16, marginRight: 10}}>Bathroom</Text>
            <StarRating
                selectedStar={(rating)=> {}}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                starColor='#D3E02E'
                starSize={30}
                maxStars={5}
                rating={3.5} />
            <Text style={styles.ratingText}>Bathroom</Text>
          </View>
        </View>

        <View style={[styles.topAndBottom, styles.judgementArea]}>
          <View style={styles.ratingStar}>
            <Text style={{fontSize: 16, marginRight: 10}}>Parking</Text>
            <StarRating
                selectedStar={(rating)=> {}}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                starColor='#D3E02E'
                starSize={30}
                maxStars={5}
                rating={3.5} />
            <Text style={styles.ratingText}>Parking</Text>
          </View>
        </View>

      </ScrollView>
    );
}

var styles = StyleSheet.create({
  container: {
    flex: 1
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
  leaveAReview: {
    backgroundColor: '#F7F7F7',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
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



export default PlaceScreen;