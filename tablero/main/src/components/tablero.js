import React from 'react';
import "./tablero.css";

function Tablero(props){
	return(
		<div className="Tablero">
			<h4 className="Nombre">{props.nombre}</h4>
			<div className="Autor">
				<p className="Info">Autor: {props.usuario}</p>
			</div>
			<div>Creado: {props.actualizado}</div>
			{props.children}
		</div>
	)
}

export default Tablero;