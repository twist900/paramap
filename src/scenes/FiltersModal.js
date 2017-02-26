import React, {Component, PropTypes} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	PixelRatio,
	Dimensions,
	TouchableOpacity,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { setPlaceSearchType } from '../actions';

class FiltersModal extends Component {
	constructor(props) {
		super(props)

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
     	dataSource: ds.cloneWithRows(require('../../data/placeTypes.js').default),
   	};
	}

	onCloseModal() {
		Actions.pop();
	}

	renderFilterItem(rowData) {
    return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.slideInnerContainer}
				onPress={() => {
         this.props.dispatch(setPlaceSearchType(rowData.type, rowData.google_type));
         Actions.pop();
        }}
			>
				<View style={styles.imageContainer}>
					<Image
						source={rowData.image}
						style={styles.image} >
            <View style={styles.backdropView}>
              <Text style={styles.filterTitle}>{rowData.type}</Text>
            </View>
					</Image>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.closeModal}>
					<Button onPress={this.onCloseModal}>
						<Icon name="ios-close" style={[styles.btn, styles.btnModal]} size={45} color="#a3a3a3" />
					</Button>
				</View>
				<View style={styles.modal}>
					<ListView
		        dataSource={this.state.dataSource}
		        renderRow={(rowData) => this.renderFilterItem(rowData)}
		      />
				</View>
			</View>
		);
	}
}

export const border = {
    width: 1 / PixelRatio.get(),
};

let width =  Dimensions.width;

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.25;
const slideWidth = viewportWidth;

let styles = StyleSheet.create({
	container: {
		marginTop: 25,
	  flex: 1,
	},
  closeModal: {
  	height: 40,
  	borderBottomColor: '#d8d8d8',
  	borderBottomWidth: border.width,
  },
  btn: {
    margin: 20,
    padding: 10
  },
  btnModal: {
    position: "absolute",
    top: -36,
    right: width,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  slideInnerContainer: {
    height: slideHeight,
    width: slideWidth
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#888888',
  },
  modal: {
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  backdropView: {
    height: 120,
    width: 320,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  filterTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    letterSpacing: 0.5
  }
});

export default connect((state) => ({}))(FiltersModal);
