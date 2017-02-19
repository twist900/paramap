import React, {Component, PropTypes} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Platform
} from 'react-native';
import Config from 'react-native-config';
import {getPlaceRatings} from '../services/firebase';
import {calcRatings} from '../utils/ratings';
import StarRating from 'react-native-star-rating';

export default class PlaceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: this.props.place
    }
  }

  componentWillMount() {
    this.getPlaceRating(this.state.place.place_id);
  }

  placeItemStyle() {
    return this.props.isSlider ? {
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius,
      height:  viewportHeight * 0.3,
      width: viewportWidth * 0.9
    } : {
      height: viewportHeight * 0.3,
      width: viewportWidth
    };
  }

  imageStyle() {
    return this.props.isSlider ? {
      borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
    } : {}
  }

  getPlaceRating(placeId) {
    getPlaceRatings(placeId)
      .then((ratings) => {
        let ratingRes = calcRatings(ratings);
        this.setState({
          place: {
            ...this.state.place,
            ratings: ratingRes
          }
        })
      })
      .catch((err) => { console.log(err) });
  }

  renderRating() {
    if (!this.state.place.ratings) {
      return;
    }

    return (
      <View style={{width: 100}}>
        <StarRating
          selectedStar={()=> {}}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          starColor='#D3E02E'
          starSize={15}
          maxStars={5}
          disabled={true}
          rating={this.state.place.ratings.overallScore} />
        <Text style={styles.subtitle}>{this.state.place.ratings.count} reviews</Text>
      </View>
    );
  }
  render() {
		let { place } = this.props;
    let uri = '';
    if(place.photos && place.photos.length > 0) {
      const image = place.photos[0];
      uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${image.photo_reference}&key=${Config.GOOGLE_MAPS_API_KEY}`;
    } else {
      uri = 'https://engeb.s3.amazonaws.com/uploads/image/file/204/placeholder.jpg'
    }

		return (
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={() => this.props.onPlaceClick(place.place_id)}
			>
				<View style={this.placeItemStyle()}>
					<Image
						source={{ uri: uri }}
						style={[styles.image, this.imageStyle()]}
					/>
				</View>
				<View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{ place.name.toUpperCase() }</Text>
          <Text style={styles.subtitle} numberOfLines={2}>{ place.vicinity }</Text>
          {this.renderRating()}
        </View>
			</TouchableOpacity>
		);
	}
}

PlaceItem.PropTypes = {
	place: PropTypes.object.isRequired,
	onPlaceClick: PropTypes.func.isRequired,
  isSlider: PropTypes.bool.isRequired
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const entryBorderRadius = 6;

let styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#888888',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  textContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  title: {
    color: '#1a1917',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  subtitle: {
    marginTop: 6,
    color: '#888888',
    fontSize: 12,
    fontStyle: 'italic'
  }
});
