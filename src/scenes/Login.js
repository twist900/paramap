import React, { Component } from "react";
import { connect } from "react-redux";
import LoginComponent from "../components/Login";
import { facebookLogin, setSkippedLogin } from "../actions/user";

class Login extends Component {
	onLoginPressed() {
	 this.props.dispatch(facebookLogin());
	}

	onSkipLogin() {
	 this.props.dispatch(setSkippedLogin());
	}

	render() {
  	return (
  		<LoginComponent
  			onSkipLogin={this.onSkipLogin.bind(this)}
  			onLoginPressed={this.onLoginPressed.bind(this)}
  		/>
  	);
	}
}

export default connect(state => ({}))(Login);
