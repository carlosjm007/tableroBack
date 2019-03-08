import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import { connect } from 'react-redux';

class Logout extends Component{	

	onClick = async (e) => {
		const data = await Api.logout(this.props.token);
		this.props.dispatch({
			type: 'SET_TOKEN',
			payload:{
				token: undefined,
			}
		});
	};

	async componentDidMount(){
		const data = await Api.auth_user(this.props.token);
		this.props.dispatch({
			type: 'SET_USER_DATA',
			payload:{
				user: data,
			}
		});
	};

	render(){
		return(
			<div className="col-md-12 m-auto">
				<div className="card card-body mt-5">
					<h2 className="text-center">Bienvenido {this.props.user.first_name}</h2>
					<button className="btn btn-primary" onClick={this.onClick}>
						Logout
					</button>
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

export default connect(mapStateToProps)(Logout);