import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import { connect } from 'react-redux';
import Login from "./login";
import Logout from "./logout";
import MisTableros from "./mis_tableros";
import OtrosTableros from "./otros_tableros";

class Auth extends Component{

	render(){
		if(this.props.token == undefined){
			return <Login></Login>;
		}
		return(
			<div className="container">
				<div className="row">
					<Logout></Logout>
				</div>
				<div className="row">
					<div className="col">
						<h3>Mis tableros</h3>
						<MisTableros></MisTableros>
					</div>
					<div className="col">
						<h3>Otros tableros</h3>
						<OtrosTableros></OtrosTableros>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state){
	return{
		token: state.auth.token,
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(Auth);