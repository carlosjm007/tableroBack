import React from 'react';
import "./idea.css";

function Idea(props){
	if (props.aprobado){
		return(
			<div className="Idea">
				<p>Aportada por: {props.usuario}</p>
				<p>{props.contenido}</p>

				{props.children}
			</div>
		);
	}
	return(null);
}

export default Idea;