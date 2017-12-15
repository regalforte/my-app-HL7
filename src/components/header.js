import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Header extends Component {
	render() {
		return (
			<header className="App-header">
				<img
					src="/img/HealthixLogo.png"
					className="App-logo"
					alt="logo"
				/>
				<h3 className="App-title">Healthix HL7 Self Testing Tool</h3>
			</header>
		);
	}
}

export default Header;
