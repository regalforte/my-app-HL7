import React, { Component } from 'react';
import Header from './Header';
import HL7TextArea from './HL7TextArea';
import UsefulUtilities from './UsefulUtilities';
import ResultsView from './ResultsView';
import checker from '../logic/checker.js';
import ResultsDisplay from './ResultsDisplay';
import deidentify from '../logic/deidentify';

export default class HL7SelfTester extends Component {
  state = {
    view: 'HL7',
    HL7Text: null,
    failures: [],
    failCount: 0,
    severityScore: 0
  }
  handleSwitchView = () => {
      let newView = this.state.view === 'HL7' ? 'results-view' : 'HL7'
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
    let newHL7Text;
    console.log(e);
    if (typeof e === 'string') {
      newHL7Text = e;
    } else if (typeof e === 'object') {
      newHL7Text = e.target.value;
    };
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
  handleDeidentifyClick = () => {
		if (this.state.view === 'results-view') {
      this.setState(() => {
        return {
          view: 'HL7'
        };
      });
    }
    if (!this.state.HL7Text) {
      return;
    }
    let deidentifiedHL7Text = deidentify(this.state.HL7Text);
    this.setState(() => {
      return {
        HL7Text: deidentifiedHL7Text
      };
    });
    this.handleHL7TextChange(deidentifiedHL7Text);
	}
  render() {
    const arrOfJSX_FailureList = this.state.failures.map(failure => {
			return (
				<li>
					{failure.mandatoryFixRequired ? <strong>MANDATORY FIX REQUIRED: </strong> : <strong>ISSUE: </strong>}
					{failure.description}
					<strong> - (Points deducted: {failure.severity})</strong>
          <br />
          <strong>Segment: {failure.segment} and Field: {failure.field}</strong>
          <br /><br />
				</li>
			);
		});
    return (
      <div>
        <Header />
        <UsefulUtilities handleDeidentifyClick={this.handleDeidentifyClick} handleUpdateHL7Text={this.handleUpdateHL7Text} handleSwitchView={this.handleSwitchView} currentView={this.state.view} />
        {this.state.view === 'HL7' ? <HL7TextArea handleHL7TextChange={this.handleHL7TextChange} HL7Text={this.state.HL7Text} /> : <ResultsView HL7Text={this.state.HL7Text} />}
        <ResultsDisplay
					count={this.state.failCount}
					countOfWhat="Failures"
					severityScore={this.state.severityScore}
					list={arrOfJSX_FailureList}
				/>
      </div>
    )
  }
}
