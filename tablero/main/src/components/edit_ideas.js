import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import Idea from "./idea";
import { connect } from 'react-redux';

class EditIdeas extends Component{
	state = {
		id: this.props.id,
		contenido: this.props.contenido,
		aprobado: this.props.aprobado,
		editado: false,
		usuario: this.props.usuario_id,
		tablero: this.props.tablero
	};
	editar = (e) => {
		this.setState({editado: true});
	};
	no_editar = (e) => {
		this.setState({editado: false});
	};
	eliminar = async (e) => {
		const {status1} = await Api.delete_idea(this.props.token, this.state.id);

		const {data, status} = await Api.tableros_list(this.props.token, true);
		this.props.update(data);
	};
	onChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	onSubmit = async (e) => {
		e.preventDefault();
		const {data1, status1} = await Api.edit_idea(this.props.token, this.state.id, this.state);

		const {data, status} = await Api.tableros_list(this.props.token, true);
		this.props.update(data);
	};

	render(){
		if(!this.state.editado){
			return(
				<Idea tablero={this.props.id} aprobado={true} usuario={this.props.usuario} contenido={this.props.contenido}>
					{this.props.aprobado?<p>Aprobada</p>:<p>Esperando por aprobación</p>}
					<button className="btn-primary" onClick={this.editar}>Modificar</button>
					<button className="btn-primary" onClick={this.eliminar}>Eliminar</button>
				</Idea>
			);
		}
		const { id, contenido, aprobado, editado, usuario, tablero } = this.state;
		return(

			<Idea tablero={this.props.tablero} usuario={this.props.usuario} aprobado={true}>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>contenido:
							<input
								type="text"
								className="form-control"
								name="contenido"
								onChange={this.onChange}
								value={contenido}
							/>
						</label>
					</div>
					{
						this.state.usuario != this.props.user.id ? (
							<div className="form-group">
								<label>
									Aprobado: 
									<input
										name="aprobado"
										type="checkbox"
										checked={this.state.aprobado}
										onChange={this.onChange} />
								</label>
							</div>
							):(
							null
							)
					}
					<button  type="submit" className="btn-primary">Aceptar</button>
				</form>
				<button className="btn-primary" onClick={this.no_editar}>Cancelar</button>
			</Idea>

			);
	}
}

function mapStateToProps(state){
	return{
		token: state.auth.token,
		user: state.auth.user
	};
};


export default connect(mapStateToProps)(EditIdeas);