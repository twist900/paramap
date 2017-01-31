import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Button
} from 'react-native';

import Config from 'react-native-config';
import Gallery from 'react-native-gallery';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import AdvancedButton from 'react-native-button';
import TabView from 'react-native-scrollable-tab-view';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import ReviewItem from './ReviewItem';
import {
    PixelRatio,
} from 'react-native';

export const border = {
    width: 1 / PixelRatio.get(),
};

var screen = Dimensions.get('window');

class PlaceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReviewListModalOpen: false
    }
  }

  renderRating(title, rating, rateCount) {
    return (
      <View style={[styles.topAndBottom, styles.judgementArea]}>
        <View style={styles.ratingStar}>
          <Text style={{fontSize: 16, marginRight: 10}}>{title}</Text>
          <StarRating
            selectedStar={(rating)=> {}}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            starColor='#D3E02E'
            starSize={25}
            maxStars={5}
            rating={rating} />
          <Text style={styles.ratingText}>{rateCount}</Text>
        </View>
      </View>
    );
  }

  renderRatings() {
    return (
      <View style={styles.ratings}>
        <AdvancedButton onPress={() => {}}>
          <View style={styles.ratingButton}>
            <Text>Entrance</Text>
            <Icon name="ios-pizza-outline" size={75} color="#a3a3a3" />
            <Text>{ this.props.entranceRating.count }/5</Text>
          </View>
        </AdvancedButton>
        <AdvancedButton onPress={() => {}}>
          <View style={styles.ratingButton}>
            <Text>Bathroom</Text>
            <Icon name="ios-glasses-outline" size={75} color="#a3a3a3" />
            <Text>{ this.props.bathroomRating.count }/5</Text>
          </View>
        </AdvancedButton>
        <AdvancedButton onPress={() => {}}>
          <View style={styles.ratingButton}>
            <Text>Parking</Text>
            <Icon name="ios-flask-outline" size={75} color="#a3a3a3" />
            <Text>{ this.props.parkingRating.count }/5</Text>
          </View>
        </AdvancedButton>
      </View>
    );
  }

  openReviewModal() {
    Actions.reviewModal({place: this.props.place});
  }

  openReviewListModal() {
    Actions.reviewListModal({reviews: _.toArray(this.props.place.reviews)});
  }

  renderReviewPreview() {
    let reviewsArray = _.toArray(this.props.place.reviews)
    let topThreeReviews =_.take(reviewsArray, 3);

    let placeReviews = _.map(topThreeReviews, (review, i) => {
      return <View key={i}>
         <ReviewItem review={review}/>
       </View>
    });

    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Reviews</Text>
          {placeReviews}
          <View style={styles.reviewsButtons}>
            <Button onPress={this.openReviewListModal.bind(this)} title="Show all" />
            <Button onPress={this.openReviewModal.bind(this)} title="Add" />
          </View>
        </View>
      </View>
    );
  }

  render() {
    if(this.props.isLoading || this.props.place == null){
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
      <View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{this.props.place.name}</Text>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{this.props.place.formatted_address}</Text>
        </View>

        { this.renderRatings() }

        <View style={styles.separator} />
        {this.renderReviewPreview()}
      </View>
    );
  }
}

PlaceDetails.propTypes = {
  place: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  entranceRating: PropTypes.object.isRequired,
  bathroomRating: PropTypes.object.isRequired,
  parkingRating: PropTypes.object.isRequired,
}

var styles = StyleSheet.create({
  reviewsButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 15

  },
  heading: {
    paddingLeft: 15,
    paddingBottom: 20
  },
  headingText: {
    fontWeight: "700",
    fontSize: 16
  },
  separator: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 1 / PixelRatio.get(),
    marginVertical: 10,
   },
  title: {
     fontSize: 38,
     backgroundColor: 'transparent'
   },
   button: {
     marginRight: 10
   },
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
  ratings: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ratingButton: {
    flex: 1, alignItems: 'center'
  }
});


export default PlaceDetails;
