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
import PlaceSlide from '../components/PlaceSlide';

class ParaList extends Component {
	constructor(props) {
		super(props)

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
     	dataSource: ds.cloneWithRows(this.props.places),
   	};
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
	        dataSource={this.state.dataSource}
	        renderRow={(rowData) => <PlaceSlide place={rowData} onPlaceClick={() => {}} />}
	      />
			</View>
		);
	}
}

export default connect((state) => ({
	places: state.nearbyPlaces,
}))(ParaList);

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
