import React,{Component} from 'react';
import PropTypes from "prop-types";
import Api from "../utils/api";
import { connect } from 'react-redux';
import Tablero from "../components/tablero";
import Idea from "../components/idea";
import CreaIdea from "../components/crea_idea";

class OtrosTableros extends Component{
	state = {
		tableros: [],
	};

	async componentDidMount(){
		const {data, status} = await Api.tableros_list(this.props.token, false);
		this.setState({tableros: data});
	}
	update_tableros = async () =>{
		this.setState({tableros: []});
		const {data, status} = await Api.tableros_list(this.props.token, false);
		this.setState({tableros: data});
	}

	render(){
		if(this.state.tableros.length == 0){
			return <h4>Cargando...</h4>;
		}
		return(
			<div className="container">
			{
				this.state.tableros.map((item) => {
					return (
						<Tablero key={item.id} {...item}>
							<CreaIdea update={this.update_tableros} tablero={item.id}>
							</CreaIdea>
							<p>Ideas:</p>
							{
								item.ideas.map((it) => {
									return(
										<Idea key={it.id} tablero={item.id} {...it}>
										</Idea>
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

export default connect(mapStateToProps)(OtrosTableros);