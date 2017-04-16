import React, { Component } from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";

import App from "./src/App";
import configureStore from "./src/store/configureStore";
const store = configureStore();

export default class paramap extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("paramap", () => paramap);
