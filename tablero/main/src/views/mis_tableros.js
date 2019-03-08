import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import { connect } from 'react-redux';
import Tablero from "../components/tablero";
import EditIdea from "../components/edit_ideas";
import CreateTablero from "../components/create_tablero";
import CreaIdea from "../components/crea_idea";


class MisTableros extends Component{
	state = {
		tableros: [],
		crea_tablero: null,
		crea_idea: null,
		tablero_id: null
	};

	async componentDidMount(){
		const {data, status} = await Api.tableros_list(this.props.token, true);
		this.setState({tableros: data});
		this.crea_tablero();
	}

	update_tableros = (data) =>{
		this.setState({tableros: []});
		this.setState({tableros: data});
		this.crea_tablero();
	}

	form_tablero = () =>{
		this.setState({crea_tablero:
			<CreateTablero update={this.update_tableros}>
				<button className="btn-primary" onClick={this.crea_tablero}>Cancelar</button>
			</CreateTablero>
		});
	}

	crea_tablero = () =>{
		this.setState({crea_tablero:
			<button className="btn-primary" onClick={this.form_tablero}>Crea un tablero</button>
		});
	}

	render(){
		const {tableros} = this.state;
		if(tableros.length == 0){
			return(
				<div className="container">
					<h4>No tienes tableros por el momento.</h4>
					{this.state.crea_tablero}
				</div>
				);
		}
		return(
			<div className="container">
				{this.state.crea_tablero}
			{
				tableros.map((item) => {
					return (
						<Tablero key={item.id} {...item}>
							{item.estado == "PU"? <p>Estado: Público</p>: <p>Estado: Privado</p>}
							<CreaIdea update={this.update_tableros} tablero={item.id}>
							</CreaIdea>
							{item.ideas.length == 0? <p>Sin ideas</p>: <p>Ideas:</p>}
							{
								item.ideas.map((it) => {
									return(
										<EditIdea update={this.update_tableros} key={it.id} tablero={item.id} {...it}>
										</EditIdea>
									)
								})
							}
						</Tablero>
					)
				})
			}
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

export default connect(mapStateToProps)(MisTableros);