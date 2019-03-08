import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import { connect } from 'react-redux';
import Register from "./register";

class Login extends Component{
	state = {
		username: "",
		password: "",
		non_field_errors:[],
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e) => {
		e.preventDefault();
		const {data, status} = await Api.login(this.state);
		if(status == 200){
			this.props.dispatch({
				type: 'SET_TOKEN',
				payload:{
					token: `Token ${data.token}`,
				}
			});
			this.props.dispatch({
				type: 'SET_USER_DATA',
				payload:{
					user: data.user,
				}
			});
		}else if(status == 400){
			this.setState({non_field_errors: data.non_field_errors});
		}
	};

	render(){
		const { username, password, non_field_errors } = this.state;
		var payments = [];
		for(let i = 0; i < non_field_errors.length ; i++){
			payments.push(
				<h4 className="text-center" key={i}>{non_field_errors[i]}</h4>
			)
		}

		return(
			<div className="col-md-12 m-auto">
				<div className="col-md-6 m-auto">
					<div className="card card-body mt-5">
						<h2 className="text-center">Login</h2>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label>Email</label>
								<input
									type="email"
									className="form-control"
									name="username"
									onChange={this.onChange}
									value={username}
								/>
							</div>

							<div className="form-group">
								<label>Password</label>
								<input
									type="password"
									className="form-control"
									name="password"
									onChange={this.onChange}
									value={password}
								/>
							</div>
							{ payments }
							<div className="form-group">
								<button type="submit" className="btn btn-primary">
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
				<Register></Register>
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

export default connect(mapStateToProps)(Login);