import React, {Component, PropTypes} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	PixelRatio,
	Dimensions,
	Platform,
	TouchableOpacity,
	Image
} from 'react-native';
import Button from 'react-native-button';
import ReviewItem from '../components/ReviewItem';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

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
				onPress={() => {}}
			>
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: rowData.image }}
						style={styles.image}
					/>
				</View>
				<View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>{ rowData.name }</Text>
            {/*<Text style={styles.subtitle} numberOfLines={2}>{ subtitle }</Text>*/}
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

FiltersModal.propTypes = {
	reviews: PropTypes.array.isRequired
}

export const border = {
    width: 1 / PixelRatio.get(),
};

let width =  Dimensions.width;

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.4;
const slideWidth = viewportWidth * 0.9;
const entryBorderRadius = 6;

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
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  modal: {
  	justifyContent: 'center'
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

export default FiltersModal;
