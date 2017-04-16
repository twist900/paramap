import React, { Component, PropTypes } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import Carousel from "react-native-snap-carousel";

import PlaceSlide from "./PlaceItem";

export default class ParaMap extends Component {
  constructor(props) {
    super(props);

    const markers = this.toMarkers(this.props.places);
    this.state = {
      region: {
        latitude: this.props.currentPosition.latitude,
        longitude: this.props.currentPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers
    };
  }

  componentWillReceiveProps(nextProps) {
    const markers = this.toMarkers(nextProps.places);
    this.setState({
      ...this.state,
      markers
    });
  }

  toMarkers(places) {
    const markers = places.map(place => {
      return {
        id: place.id,
        name: place.name,
        coordinate: {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng
        }
      };
    });
    return markers;
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  renderItem(place) {
    return (
      <PlaceSlide
        onPlaceClick={this.props.onPlaceClick}
        isSlider={true}
        place={place}
      />
    );
  }

  zoomToRegion(slideIndex, itemData) {
    this.onRegionChange({
      latitude: itemData.geometry.location.lat,
      longitude: itemData.geometry.location.lng,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121
    });
  }

  render() {
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
      "window"
    );
    const slideWidth = viewportWidth * 0.9;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          {this.state.markers.map((marker, i) => (
            <MapView.Marker
              coordinate={marker.coordinate}
              title={marker.name}
              key={i}
            />
          ))}

        </MapView>
        <View style={{ position: "absolute", bottom: 0, left: 0 }}>
          <Carousel
            ref={"carousel"}
            style={{ paddingLeft: 20, paddingBottom: 10 }}
            items={this.props.places}
            renderItem={this.renderItem.bind(this)}
            sliderWidth={slideWidth}
            itemWidth={slideWidth}
            onSnapToItem={this.zoomToRegion.bind(this)}
            snapOnAndroid={true}
            enableMomentum={true}
            decelerationRate="fast"
          />
        </View>

      </View>
    );
  }
}

ParaMap.propTypes = {
  places: PropTypes.array.isRequired,
  currentPosition: PropTypes.object.isRequired,
  onPlaceClick: PropTypes.func.isRequired
};

let styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  map: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
