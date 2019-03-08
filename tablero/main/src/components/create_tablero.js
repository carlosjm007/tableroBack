import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import "./tablero.css";
import { connect } from 'react-redux';

class CreateTablero extends Component{
	state = {
		usuario: this.props.user.id,
		estado: "PR",
		nombre: ""
	};
	onChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	onChangeSelect = event => {
		this.setState({
			estado: event.target.value
		});
	}
	onSubmit = async (e) => {
		e.preventDefault();
		const {data1, status1} = await Api.create_tablero(this.props.token, this.state);

		const {data, status} = await Api.tableros_list(this.props.token, true);
		this.props.update(data);
	};
	render(){
		const { usuario, estado, nombre } = this.state;
		return(
			<div className="Tablero">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Nombre:
							<input
								type="text"
								className="form-control"
								name="nombre"
								onChange={this.onChange}
								value={nombre}
							/>
						</label>
					</div>
					<div className="form-group">
						<label>
							Estado: 
							<select value={estado} onChange={this.onChangeSelect}>
								<option value="PU">Público</option>
								<option value="PR">Privado</option>
							</select>
						</label>
					</div>
					<button  type="submit" className="btn-primary">Aceptar</button>
				</form>
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		token: state.auth.token,
		user: state.auth.user
	};
};


export default connect(mapStateToProps)(CreateTablero);