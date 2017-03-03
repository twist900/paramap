import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  PixelRatio,
  Dimensions
} from 'react-native';
import Button from 'react-native-button';
import ReviewItem from './ReviewItem';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

class ReviewListModal extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.reviews),
    };
  }

  onCloseModal() {
    Actions.pop();
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
            renderRow={(rowData) => <ReviewItem review={rowData} />}
          />
        </View>
      </View>
    );
  }
}

ReviewListModal.propTypes = {
  reviews: PropTypes.array.isRequired
}

export const border = {
    width: 1 / PixelRatio.get(),
};

let width =  Dimensions.width;

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
});

export default ReviewListModal;
