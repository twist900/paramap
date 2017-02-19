import React, {Component, PropTypes} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native';
import Config from 'react-native-config';
import { getPlaceRatings } from '../services/firebase';
import { calcRatings } from '../utils/ratings';
import StarRating from 'react-native-star-rating';
import { Card } from 'react-native-material-design';

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
      width: viewportWidth * 0.85
    } : {
      width: viewportWidth * 0.9
    };
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
			<View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.onPlaceClick(place.place_id)}
        >
          <Card style={this.placeItemStyle()}>
            <Card.Media
              image={<Image source={{ uri }} />}
              overlay
            />
            <Card.Body>
              <Text style={styles.title} numberOfLines={2}>{ place.name.toUpperCase() }</Text>
              <Text style={styles.subtitle} numberOfLines={2}>{ place.vicinity }</Text>
              {this.renderRating()}
            </Card.Body>
          </Card>
        </TouchableOpacity>
      </View>
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
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: null,
    height: null,
  }
});
