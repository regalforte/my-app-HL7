import React, { Component } from 'react';
import checker from '../logic/checker.js';
import ResultsDisplay from './results_display';

export default class HL7Validator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			failures: [],
			failCount: 0,
			severityScore: 0,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		var value = e.target.value;
		var failures = checker(value);
		var sevScore = 0;

		var arrOfSeverity = [];
		failures.map(each => {
			arrOfSeverity.push(each.severity);
		});
		console.log('test', arrOfSeverity);

		if (arrOfSeverity.length > 0) {
			sevScore = arrOfSeverity.reduce((a, b) => {
				return a + b;
			});
		}

		this.setState({
			failures: failures,
			failCount: failures.length,
			severityScore: sevScore,
		});

		console.log('failures:', failures);
		console.log('failures.length:', failures.length);
	}

	render() {
		console.log('this.state', this.state);

		const arrOfJSX_FailureList = this.state.failures.map(failure => {
			return (
				<li>
					<strong>ISSUE: </strong>
					{failure.description}
					<strong> - (Severity: {failure.severity})</strong>
				</li>
			);
		});

		return (
			<div id="container">
				<div id="hl7input">
					<h1>Paste your HL7 below to begin</h1>
					<textarea id="hl7-textarea" onChange={this.handleChange} />
				</div>
				<ResultsDisplay
					title="Results"
					count={this.state.failCount}
					countOfWhat="Failures"
					severityScore={this.state.severityScore}
					list={arrOfJSX_FailureList}
				/>
			</div>
		);
	}
}
