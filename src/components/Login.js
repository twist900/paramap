import React, { Component, PropTypes } from "react";
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Text
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1 }).start();
  }

  render() {
    return (
      <Image
        source={require("../../img/login_background.jpg")}
        style={styles.container}
      >
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
          style={styles.statusBar}
        />
        <TouchableOpacity
          accessabilityLabel="Skip Login"
          accessabilityTrait="button"
          style={styles.skip}
          onPress={() => this.props.onSkipLogin()}
        >
          <Image source={require("../../img/x.png")} />
        </TouchableOpacity>
        <Animated.View
          style={[styles.section, { opacity: this.state.fadeAnim }]}
        >
          <Text style={styles.h1}>Paramap</Text>
          <Text style={styles.h2}>Making the world accessible, together.</Text>
        </Animated.View>

        <View style={[styles.loginButtonWrapper]}>
          <Icon.Button
            name="facebook"
            size={30}
            style={styles.facebookButton}
            backgroundColor="#3b5998"
            onPress={() => {
              this.props.onLoginPressed();
            }}
          >
            <Text style={styles.facebookButtonText}>Login With Facebook</Text>
          </Icon.Button>
        </View>
      </Image>
    );
  }
}
const width = Dimensions.get("window").width;

Login.propTypes = {
  onSkipLogin: PropTypes.func.isRequired,
  onLoginPressed: PropTypes.func.isRequired
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 26,
    width: undefined,
    height: undefined
  },
  statusBar: {
    paddingBottom: 20
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  h1: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: Math.round(74 * (width / 375)),
    color: "#032250",
    backgroundColor: "transparent"
  },
  h2: {
    textAlign: "center",
    fontSize: 17,
    color: "#032250",
    marginVertical: 20
  },
  skip: {
    position: "absolute",
    right: 0,
    top: 20,
    padding: 15
  },
  loginButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  facebookButton: {
    width: 0.78 * width,
    height: 58,
    justifyContent: "center",
    alignItems: "center"
  },
  facebookButtonText: {
    fontSize: width / 20,
    color: "#F7F7F7",
    fontWeight: "bold",
    marginLeft: 20
  }
});
