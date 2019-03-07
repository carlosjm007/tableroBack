import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Auth from "../views/auth";
import { Provider } from 'react-redux';
import {PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from '../store';

class App extends Component {
	render() {
		return (
			<Provider
				store={store}
			>
				<PersistGate
					loading={<h1>Cargando...</h1>}
					persistor={persistor}
				>
					<Auth></Auth>
				</PersistGate>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));