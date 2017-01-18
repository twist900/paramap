import React from 'react';
import {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import Config from 'react-native-config';
import { BlurView } from 'react-native-blur';
import StarRating from 'react-native-star-rating';

import MapView from 'react-native-maps';
import PanController from './PanController';
import PriceMarker from './AnimatedPriceMarker';
import _ from 'lodash';

var screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = -33.8670522;
const LONGITUDE = 151.1957362;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var ITEM_SPACING = 10;
var ITEM_PREVIEW = 10;
var ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
var SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
var ITEM_PREVIEW_HEIGHT = 200;
var SCALE_END = screen.width / ITEM_WIDTH;
var BREAKPOINT1 = 246;
var BREAKPOINT2 = 350;

const ANDROID = Platform.OS === 'android';

const panX = new Animated.Value(0);
const panY = new Animated.Value(0);

const scrollY = panY.interpolate({
  inputRange: [-1, 1],
  outputRange: [1, -1],
});

const scrollX = panX.interpolate({
  inputRange: [-1, 1],
  outputRange: [1, -1],
});

const scale = scrollY.interpolate({
  inputRange: [0, BREAKPOINT1],
  outputRange: [1, 1.6],
  extrapolate: 'clamp',
});

const translateY = scrollY.interpolate({
  inputRange: [0, BREAKPOINT1],
  outputRange: [0, -100],
  extrapolate: 'clamp',
});

const ONE = new Animated.Value(1);

export default class  AnimatedViews extends React.Component{
  constructor(props) {
    super(props);

    const markers = this.toMarkers(this.props.places);

    const animations = this.createAnimations(markers);

    this.state = {
      panX,
      panY,
      animations,
      index: 0,
      canMoveHorizontal: true,
      scrollY,
      scrollX,
      scale,
      translateY,
      markers,
      region: new MapView.AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };
  }

  toMarkers(places){
    let markers = places.map( (place) => {
          return ({
            id: place.place_id,
            name: place.name,
            coordinate: {
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            },
            place_id: place.place_id
          });
        });
    return markers;
  }


  componentWillReceiveProps(nextProps){
    let markers = this.toMarkers(nextProps.places);
    let animations = this.createAnimations(markers);
    this.setState({
      markers,
      animations
    })

    var { region, panX, panY, scrollX } = this.state;

    panX.addListener(this.onPanXChange.bind(this));
    // panY.addListener(this.onPanYChange.bind(this));

    region.stopAnimation();
    region.timing({
      latitude: scrollX.interpolate({
        inputRange: markers.map((m, i) => i * SNAP_WIDTH),
        outputRange: markers.map(m => m.coordinate.latitude),
      }),
      longitude: scrollX.interpolate({
        inputRange: markers.map((m, i) => i * SNAP_WIDTH),
        outputRange: markers.map(m => m.coordinate.longitude),
      }),
      duration: 0,
    }).start();
  }


  createAnimations(markers){
    return markers.map((m, i)  => {
          const xLeft = -SNAP_WIDTH * i + SNAP_WIDTH/2;
          const xRight = -SNAP_WIDTH * i - SNAP_WIDTH/2;
          const xPos = -SNAP_WIDTH * i;

          const isIndex = panX.interpolate({
            inputRange: [xRight - 1, xRight, xLeft, xLeft+1],
            outputRange: [0, 1, 1, 0],
            extrapolate: 'clamp',
          });

          const isNotIndex = panX.interpolate({
            inputRange: [xRight - 1, xRight, xLeft, xLeft+1],
            outputRange: [1, 0, 0, 1],
            extrapolate: 'clamp',
          });

          const center = panX.interpolate({
            inputRange: [xPos - 10, xPos, xPos + 10],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          const selected = panX.interpolate({
            inputRange: [xRight, xPos, xLeft],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          const translateY = Animated.multiply(isIndex, panY);

          const translateX = panX;

          const anim = Animated.multiply(isIndex, scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }));

          const scale = Animated.add(ONE, Animated.multiply(isIndex, scrollY.interpolate({
            inputRange: [BREAKPOINT1, BREAKPOINT2],
            outputRange: [0, SCALE_END-1],
            extrapolate: 'clamp',
          })));

          // [0 => 1]
          var opacity = scrollY.interpolate({
            inputRange: [BREAKPOINT1, BREAKPOINT2],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });

          // if i === index: [0 => 0]
          // if i !== index: [0 => 1]
          opacity = Animated.multiply(isNotIndex, opacity);


          // if i === index: [1 => 1]
          // if i !== index: [1 => 0]
          opacity = opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          });

          var markerOpacity = scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });

          markerOpacity = Animated.multiply(isNotIndex, markerOpacity).interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          });

          var markerScale = selected.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
          });

          return {
            translateY,
            translateX,
            scale,
            opacity,
            anim,
            center,
            selected,
            markerOpacity,
            markerScale,
          };
        });

  }

  componentDidMount() {
    var { region, panX, panY, scrollX, markers } = this.state;

    panX.addListener(this.onPanXChange.bind(this));
    // panY.addListener(this.onPanYChange.bind(this));

    region.stopAnimation();
    region.timing({
      latitude: scrollX.interpolate({
        inputRange: markers.map((m, i) => i * SNAP_WIDTH),
        outputRange: markers.map(m => m.coordinate.latitude),
      }),
      longitude: scrollX.interpolate({
        inputRange: markers.map((m, i) => i * SNAP_WIDTH),
        outputRange: markers.map(m => m.coordinate.longitude),
      }),
      duration: 0,
    }).start();
  }

  onStartShouldSetPanResponder(e) {
    // we only want to move the view if they are starting the gesture on top
    // of the view, so this calculates that and returns true if so. If we return
    // false, the gesture should get passed to the map view appropriately.
    var { panY } = this.state;
    var { pageY } = e.nativeEvent;
    var topOfMainWindow = ITEM_PREVIEW_HEIGHT + 1 * panY.__getValue();
    var topOfTap = screen.height - pageY;

    return topOfTap < topOfMainWindow;
  }

  onMoveShouldSetPanResponder(e) {
    var { panY } = this.state;
    var { pageY } = e.nativeEvent;
    var topOfMainWindow = ITEM_PREVIEW_HEIGHT + 1 * panY.__getValue();
    var topOfTap = screen.height - pageY;

    return topOfTap < topOfMainWindow;
  }

  onPanXChange({ value }) {
    var { index, region, panX, markers } = this.state;
    var newIndex = Math.floor((-1 * value + SNAP_WIDTH / 2) / SNAP_WIDTH);
    if (index !== newIndex) {
      this.setState({ index: newIndex });
    }
  }

  onPanYChange({ value }) {
    var { canMoveHorizontal, region, scrollY, scrollX, markers, index } = this.state;
    var shouldBeMovable = Math.abs(value) < 2;
    if (shouldBeMovable !== canMoveHorizontal) {
      this.setState({ canMoveHorizontal: shouldBeMovable });
      if (!shouldBeMovable) {
        var { coordinate } = markers[index];
        region.stopAnimation();
        region.timing({
          latitude: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [coordinate.latitude, coordinate.latitude - LATITUDE_DELTA * 0.5 * 0.375],
            extrapolate: 'clamp',
          }),
          latitudeDelta: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 0.5],
            extrapolate: 'clamp',
          }),
          longitudeDelta: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [LONGITUDE_DELTA, LONGITUDE_DELTA * 0.5],
            extrapolate: 'clamp',
          }),
          duration: 0,
        }).start();
      } else {
        region.stopAnimation();
        region.timing({
          latitude: scrollX.interpolate({
            inputRange: markers.map((m, i) => i * SNAP_WIDTH),
            outputRange: markers.map(m => m.coordinate.latitude),
          }),
          longitude: scrollX.interpolate({
            inputRange: markers.map((m, i) => i * SNAP_WIDTH),
            outputRange: markers.map(m => m.coordinate.longitude),
          }),
          duration: 0,
        }).start();
      }
    }
  }

  onRegionChange(region) {
    //this.state.region.setValue(region);
  }

  renderPlaceCard(marker) {
    const place = _.find(this.props.places, p => p.place_id == marker.place_id);
    let url = "'../../img/placeholder.png'";
    if(place.photos && place.photos.length > 0) {
      const image = place.photos[0];
      url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${image.photo_reference}&key=${Config.GOOGLE_MAPS_API_KEY}`;
    }

    return (
      <TouchableOpacity
        onPress={ () => this.props.onPlaceClick(marker.place_id)}
        style={{ flex: 1 }}
      >
        <Image
          style={styles.placeImage}
          source={{uri: url}}
          resizeMode='cover'
          defaultSource={require('../../img/placeholder.png')}
        >
          <BlurView blurType="dark" blurAmount={0.5} style={styles.blur}>
            <Text style={styles.placeCardTitle}>{marker.name}</Text>
            <StarRating
              selectedStar={(rating)=> {}}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor='#D3E02E'
              starSize={20}
              maxStars={5}
              rating={3.5} />
          </BlurView>
        </Image>
      </TouchableOpacity>

    );
  }

  render(){
    const {
      panX,
      panY,
      animations,
      canMoveHorizontal,
      markers,
      region,
    } = this.state;

    return (
      <View style={styles.container}>
        <PanController
          style={styles.container}
          vertical
          horizontal={canMoveHorizontal}
          xMode="snap"
          snapSpacingX={SNAP_WIDTH}
          yBounds={[-1 * screen.height, 0]}
          xBounds={[-screen.width * (markers.length-1), 0]}
          panX={panX}
          onStartShouldSetPanResponder={this.onStartShouldSetPanResponder.bind(this)}
          onMoveShouldSetPanResponder={this.onMoveShouldSetPanResponder.bind(this)}
        >
          <MapView.Animated
            style={styles.map}
            region={region}
            onRegionChange={this.onRegionChange.bind(this)}
          >
            {markers.map((marker, i) => {
              const {
                selected,
                markerOpacity,
                markerScale,
              } = animations[i];

              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={marker.coordinate}
                >
                  <PriceMarker
                    style={{
                      opacity: markerOpacity,
                      transform: [
                        { scale: markerScale },
                      ],
                    }}
                    name={marker.name}
                    selected={selected}
                  />
                </MapView.Marker>
              );
            })}
          </MapView.Animated>
          <View style={styles.itemContainer}>
            {markers.map((marker, i) => {
              const {
                translateY,
                translateX,
                scale,
                opacity,
              } = animations[i];

              return (
                <Animated.View
                  key={marker.id}
                  style={[styles.item, {
                    opacity,
                    transform: [
                      { translateX },
                      { scale },
                    ],
                  }]}
                >

                { this.renderPlaceCard(marker) }
                {/*<TouchableOpacity
                  onPress={ () => this.props.onPlaceClick(marker.place_id) }
                  style={styles.button}>
                 <Text>
                    {marker.name}
                  </Text>
                </TouchableOpacity>*/}

                </Animated.View>
              );
            })}
          </View>
        </PanController>
      </View>
    );
  }
}

var styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: ITEM_SPACING / 2 + ITEM_PREVIEW,
    position: 'absolute',
    top: screen.height - ITEM_PREVIEW_HEIGHT,
    paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
  },
  map: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_PREVIEW_HEIGHT,
    backgroundColor: 'grey',
    marginHorizontal: ITEM_SPACING / 2,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#000',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeImage: {
    flex:1,
    width: null,
    height: null
  },
  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  placeCardTitle: {
    color: 'white',
    fontSize: 21
  }

});

AnimatedViews.propTypes = {
  places: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  isLoading: React.PropTypes.bool
}
