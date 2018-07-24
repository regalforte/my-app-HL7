import React, { Component } from 'react';

class ResultsDisplay extends Component {
	render() {
		return (
			<div id="results">
				<h2>Results:</h2>
				<h4>
					{this.props.count} {this.props.count === 1 ? <span>Failure</span> : <span>Failures</span>}
				</h4>
				<p id="severity-score-display">
					Total Score: {100 - this.props.severityScore}/100
				</p>
				<ul>{this.props.list}</ul>
			</div>
		);
	}
}

export default ResultsDisplay;
