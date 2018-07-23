import React, { Component } from 'react';
import Header from './Header';
import HL7TextArea from './HL7TextArea';
import UsefulUtilities from './UsefulUtilities';
import DetailedView from './DetailedView';
import checker from '../logic/checker.js';
import ResultsDisplay from './ResultsDisplay';

export default class HL7SelfTester extends Component {
  state = {
    view: 'HL7',
    HL7Text: null,
    failures: [],
    failCount: 0,
    severityScore: 0
  }
  handleSwitchView = () => {
      let newView = this.state.view === 'HL7' ? 'detailed-view' : 'HL7'
      this.setState(() => ({
        view: newView
      }));
  }
  handleUpdateHL7Text = (newHL7Text) => {
    this.setState(() => ({
      HL7Text: newHL7Text
    }));
  }
  handleHL7TextChange = (e) => {
    let newHL7Text = e.target.value;
    this.setState(() => ({
      HL7Text: newHL7Text
    }));
    let failures = checker(newHL7Text);
    let sevScore = 0;
    let arrOfSeverity = [];
    failures.map(each => {
      arrOfSeverity.push(each.severity);
    });
    if (arrOfSeverity.length > 0) {
      sevScore = arrOfSeverity.reduce((a, b) => {
        return a + b;
      });
    }
    this.setState(() => ({
      failures: failures,
      failCount: failures.length,
      severityScore: sevScore,
    }));
  }
  render() {
    const arrOfJSX_FailureList = this.state.failures.map(failure => {
			return (
				<li>
					<strong>ISSUE: </strong>
					{failure.description}
					<strong> - (Points deducted: {failure.severity})</strong>
				</li>
			);
		});
    return (
      <div>
        <Header />
        <UsefulUtilities handleUpdateHL7Text={this.handleUpdateHL7Text} handleSwitchView={this.handleSwitchView} currentView={this.state.view} />
        {this.state.view === 'HL7' ? <HL7TextArea handleHL7TextChange={this.handleHL7TextChange} HL7Text={this.state.HL7Text} /> : <DetailedView />}
        <ResultsDisplay
					title="Results"
					count={this.state.failCount}
					countOfWhat="Failures"
					severityScore={this.state.severityScore}
					list={arrOfJSX_FailureList}
				/>
      </div>
    )
  }
}
