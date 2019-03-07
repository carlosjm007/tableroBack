import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import { connect } from 'react-redux';
import Login from "./login";
import Logout from "./logout";

class Auth extends Component{

	render(){
		if(this.props.token == undefined){
			return <Login></Login>;
		}
		return <Logout></Logout>;
	}
};

function mapStateToProps(state){
	return{
		token: state.auth.token,
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(Auth);