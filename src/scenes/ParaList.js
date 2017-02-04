import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	PixelRatio,
	Dimensions
} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import PlaceSlide from '../components/PlaceItem';
import { selectPlace } from '../actions';
import { Actions } from 'react-native-router-flux';

class ParaList extends Component {
	constructor(props) {
		super(props)

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
     	dataSource: ds.cloneWithRows(this.props.places),
   	};
	}

	renderRow(rowData) {
		return (
			<PlaceSlide
				place={rowData}
				isSlider={false}
				onPlaceClick={this.props.onPlaceClick}
				/>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
	        dataSource={this.state.dataSource}
	        renderRow={this.renderRow.bind(this)}
	      />
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPlaceClick(placeId){
    dispatch(selectPlace(placeId));
    Actions.placeDetails();
  }
})

export default connect((state) => ({
	places: state.nearbyPlaces,
}), mapDispatchToProps)(ParaList);

export const border = {
    width: 1 / PixelRatio.get(),
};

let width =  Dimensions.width;

let styles = StyleSheet.create({
	container: {
	  flex: 1,
	  paddingTop: 65,
	  alignItems: 'center'
	}
});
