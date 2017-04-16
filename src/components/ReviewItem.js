import React, { Component, PropTypes } from "react";
import {
  Image,
  StyleSheet,
  PixelRatio,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
} from "react-native";
import HTML from "react-native-htmlview";

import { getProfile } from "../services/firebase";

class ReviewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewer: null
    };
  }

  componentWillMount() {
    getProfile(this.props.review.reviewer)
      .then(reviewer => {
        this.setState({ reviewer });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.reviewer == null) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" animating={true} />
        </View>
      );
    }

    return (
      <View>
        <TouchableHighlight onPress={() => {}} underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
              <Image
                source={{ uri: this.state.reviewer.picture.data.url }}
                style={styles.avatar}
              />
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {this.state.reviewer.name}
                </Text>
                <Text style={styles.commentText}>
                  <HTML value={this.props.review.body} />
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  commentContent: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  userName: {
    fontWeight: "700"
  },
  commentBody: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  commentText: {
    flex: 1,
    flexDirection: "row"
  },
  cellBorder: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  }
});

export default ReviewItem;
