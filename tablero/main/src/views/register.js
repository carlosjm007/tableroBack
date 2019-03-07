import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import { connect } from 'react-redux';

class Register extends Component{
	state = {
		password: "",
		identificacion: "",
		email: "",
		first_name: "",
		last_name: "",
		errors:{}
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e) => {
		e.preventDefault();
		var formData = new FormData();
		formData.append("password", this.state.password);
		formData.append("identificacion", this.state.identificacion);
		formData.append("email", this.state.email);
		formData.append("first_name", this.state.first_name);
		formData.append("last_name", this.state.last_name);
		const {data, status} = await Api.Register(formData);
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
			this.setState({errors: data});
		}
	};

	render(){
		const { password, identificacion, email, first_name, last_name, errors } = this.state;

		return(
			<div className="col-md-6 m-auto">
				<div className="card card-body mt-5">
					<h2 className="text-center">Register</h2>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								onChange={this.onChange}
								value={email}
							/>
							{
								this.state.errors.email != undefined ? (
									this.state.errors.email.map((item, index) => {
										return <h4 key={index}>{item}</h4>
									})
							) : (
								<h4 className="text-center"></h4>
							)}
						</div>

						<div className="form-group">
							<label>First name</label>
							<input
								type="text"
								className="form-control"
								name="first_name"
								onChange={this.onChange}
								value={first_name}
							/>
							{
								this.state.errors.first_name != undefined ? (
									this.state.errors.first_name.map((item, index) => {
										return <h4 key={index}>{item}</h4>
									})
							) : (
								<h4 className="text-center"></h4>
							)}
						</div>

						<div className="form-group">
							<label>Last name</label>
							<input
								type="text"
								className="form-control"
								name="last_name"
								onChange={this.onChange}
								value={last_name}
							/>
							{
								this.state.errors.last_name != undefined ? (
									this.state.errors.last_name.map((item, index) => {
										return <h4 key={index}>{item}</h4>
									})
							) : (
								<h4 className="text-center"></h4>
							)}
						</div>

						<div className="form-group">
							<label>Identification</label>
							<input
								type="number"
								className="form-control"
								name="identificacion"
								onChange={this.onChange}
								value={identificacion}
							/>
							{
								this.state.errors.identificacion != undefined ? (
									this.state.errors.identificacion.map((item, index) => {
										return <h4 key={index}>{item}</h4>
									})
							) : (
								<h4 className="text-center"></h4>
							)}
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
							{
								this.state.errors.password != undefined ? (
									this.state.errors.password.map((item, index) => {
										return <h4 key={index}>{item}</h4>
									})
							) : (
								<h4 className="text-center"></h4>
							)}
						</div>

						<div className="form-group">
							<button type="submit" className="btn btn-primary">
								Register
							</button>
						</div>
					</form>
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

export default connect(mapStateToProps)(Register);