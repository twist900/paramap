import React, {Component, PropTypes} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Platform} from 'react-native';
import Config from 'react-native-config';

export default class PlaceSlide extends Component {
	render() {
		let { place } = this.props;
		let uri = "'../../img/placeholder.png'";
	  if(place.photos && place.photos.length > 0) {
	    const image = place.photos[0];
	    uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${image.photo_reference}&key=${Config.GOOGLE_MAPS_API_KEY}`;
	  }

		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.slideInnerContainer}
				onPress={() => this.props.onPlaceClick(place.place_id)}
			>
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: uri }}
						style={styles.image}
					/>
				</View>
				<View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>{ place.name.toUpperCase() }</Text>
            {/*<Text style={styles.subtitle} numberOfLines={2}>{ subtitle }</Text>*/}
        </View>
			</TouchableOpacity>
		);
	}
}

PlaceSlide.PropTypes = {
	place: PropTypes.object.isRequired,
	onPlaceClick: PropTypes.func.isRequired
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.4;
const slideWidth = viewportWidth * 0.9;
const entryBorderRadius = 6;

let styles = StyleSheet.create({
  slideInnerContainer: {
    height: slideHeight,
    width: slideWidth
  },

  imageContainer: {
    flex: 1,
    backgroundColor: '#888888',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: null,
    height: null,
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
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
