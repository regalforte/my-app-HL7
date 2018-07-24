import React, { Component } from 'react';

var sampleHL7 =
	'MSH|^~&|HIHLSCA-228913|TBHC|||20170523135425||ADT^A08|21611171045002504401|P|2.3|||NE|NE\n' +
	'EVN|A08|20170523123456789||RLP|PGS\n' +
	'PID|0001||TBHC20160916099^^^MRN||TestLastName^TestFirstName^""^""^""^""|CLAUDIA|19920406|F|""^^^^^^||1234 Fake Road^^Huntington^NY^12345^US^^^Suffolk||(123)456-7890|(123)456-7890|SPA|S|CH|123456789^^^Account|001-02-0304|^|~00000000|H|US||||\n' +
	'PV1|0001|I|G7B^708^A|1||||||MED|||N|1||||IN|520512227|SLF|||||||||||||||||||G||AC|||20170523123456789\n' +
	'PV2||GS|||||||  \n' +
	'GT1|0001||TEST^IBE||123 HELLO AVE^^BROOKLYN^NY^12345^US^^^KING|(123)456-7890||19550523|M||SLF^SELF|||||||||U||||||||||S\n' +
	'IN1|0001|SLFJ||SELF-PAY|||||||||||P|TEST^IBE|SLF^SELF|19550523|123 HELLO AVE^^BROOKLYN^NY^12345^US^^^KING|||||||||||||||||||||||U|M\n' +
	'IN2|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||(123)456-7890\n' +
	'CON|||||||||||Y|||20180724|';

export default class UsefulUtilities extends Component {
	render() {
		let switchToButtonText;
		if (this.props.currentView === 'HL7') {
			switchToButtonText = 'Switch To Detailed View';
		} else if (this.props.currentView === 'results-view') {
			switchToButtonText = 'Switch to HL7 View';
		}

		return (
			<div id="useful-utilities">
				<h3>Useful utilities</h3>
				<button onClick={() => this.props.handleUpdateHL7Text(sampleHL7)}>Generate Sample HL7</button>
				<button onClick={this.props.handleDeidentifyClick}>De-identify HL7</button>
				<button onClick={this.props.handleSwitchView}>{switchToButtonText}</button>
			</div>
		);
	}
}
