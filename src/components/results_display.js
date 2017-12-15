import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ResultsDisplay extends Component {
	render() {
		return (
			<div id="results">
				<h2>{this.props.title}</h2>
				<p>
					{this.props.count} {this.props.countOfWhat}(s)
				</p>
				<p id="severity-score-display">
					Total Severity Score: {this.props.severityScore}
				</p>
				<ul>{this.props.list}</ul>
			</div>
		);
	}
}

export default ResultsDisplay;
