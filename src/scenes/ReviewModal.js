import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  PixelRatio,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import Button from "react-native-button";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import { submitReview } from "../actions";

class ReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  onSubmitReview() {
    this.props.dispatch(
      submitReview(this.props.place.id, { body: this.state.text })
    );
    Actions.pop();
  }

  onCloseModal() {
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.closeModal}>
          <Button onPress={this.onCloseModal}>
            <Icon
              name="ios-close"
              style={[styles.btn, styles.btnModal]}
              size={45}
              color="#a3a3a3"
            />
          </Button>
        </View>

        <TextInput
          value={this.state.text}
          onChangeText={text => {
            this.setState({ text });
          }}
          multiline={true}
          style={styles.input}
          placeholder="What Do You Like?"
        />

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            underlayColor="#3f62aa"
            style={[styles.button]}
            onPress={this.onSubmitReview.bind(this)}
          >
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

export default connect(state => ({
  place: state.selectedPlace,
  isLoading: state.isLoading
}))(ReviewModal);

const border = {
  width: 1 / PixelRatio.get()
};

let { height, width } = Dimensions.get("window");

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeModal: {
    height: 70,
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: border.width
  },
  btn: {
    margin: 20,
    padding: 10
  },
  btnModal: {
    top: -9,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  input: {
    height: height - 200,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#ededed",
    borderRadius: 4,
    padding: 10,
    fontSize: 18,
    color: "#666666"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  button: {
    marginRight: 20,
    marginTop: 15,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b5998",
    borderRadius: 4
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});
