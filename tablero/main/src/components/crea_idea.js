import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import Idea from "./idea";
import { connect } from 'react-redux';

class CreaIdea extends Component{
	state = {
		contenido: this.props.contenido,
		usuario: this.props.user.id,
		tablero: this.props.tablero,
		buton: true
	};

	form_idea = (id) =>{
		this.setState({buton:
			false
		});
	}

	crea_idea = () =>{
		this.setState({buton:
			true
		});
	}

	onChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	onSubmit = async (e) => {
		e.preventDefault();
		const {data1, status1} = await Api.create_idea(this.props.token, this.state);

		const {data, status} = await Api.tableros_list(this.props.token, true);
		this.props.update(data);
	};

	render(){
		const {contenido, usuario, tablero, buton} = this.state;
		if(buton){
			return(<button className="btn-primary" onClick={this.form_idea}>Crea una idea</button>);
		}
		return(
			<div className="Idea">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Contenido:
							<input
								type="text"
								className="form-control"
								name="contenido"
								onChange={this.onChange}
								value={contenido}
							/>
						</label>
					</div>
					<button  type="submit" className="btn-primary">Aceptar</button>
				</form>

				<button className="btn-primary" onClick={this.crea_idea}>Cancelar</button>
			</div>);
	}
}

function mapStateToProps(state){
	return{
		token: state.auth.token,
		user: state.auth.user
	};
};


export default connect(mapStateToProps)(CreaIdea);