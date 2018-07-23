import React, { Component } from 'react';

export default class HL7TextArea extends Component {
	render() {
		return (
			<div id="container">
				<div id="hl7input">
					<h1>Paste your HL7 below to begin</h1>
					<textarea id="hl7-textarea" onChange={this.props.handleHL7TextChange} value={this.props.HL7Text}></textarea>
				</div>
			</div>
		);
	}
}
