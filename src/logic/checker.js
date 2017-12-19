var failures = [];
var arrayOfEachLine;

const checker = userInput => {
	failures = [];

	//turns userInput into array of each line
	arrayOfEachLine = userInput.split(/\n/).filter(str => {
		return str.trim().length > 0;
	});

	// VALIDATIONS:

	//custom validation:
	check4thCharIsPipe();

	//regex validations:
	checkField('EVN', 1, '^A\\d\\d$', {
		description: 'Event type code should be A followed by 2 digits',
		severity: 1,
	});
	checkField('PID', 5, '^[A-Za-z^".]+$', {
		description: 'Numbers or unexpected symbols detected in patient name',
		severity: 1,
	});
	checkField('PID', 8, '^[A-Za-z]$', {
		description: 'Gender should consist of one letter',
		severity: 2,
	});
	checkField('PID', 7, '^\\d{8}$', {
		description:
			'DOB should consist of at least exactly 8 digits (no letters, no symbols)',
		severity: 2,
	});
	checkField('PID', 11, '^.+(US|United State).+$', {
		description: 'Country should be US',
		severity: 1,
	});
	checkField('CON', 11, '^.$', {
		description: 'Consent value should be a single character',
		severity: 3,
	});
	checkField('CON', 14, '^\\d{8}', {
		description:
			'Consent effective date should consist of at least 8 digits (no letters, no symbols)',
		severity: 2,
	});

	//not empty validations:
	checkFieldNotEmpty('MSH', 3, {
		description: 'Sending facility namespace ID should not be left blank',
		severity: 7,
	});
	checkFieldNotEmpty('PID', 3, {
		description: 'MRN field should not be left blank',
		severity: 8,
	});

	return failures;
};

function check4thCharIsPipe() {
	var pipe4Bool = arrayOfEachLine.every(str => {
		return str[3] === '|';
	});
	console.log(pipe4Bool);
	if (!pipe4Bool) {
		pushFailureIfUnique({
			description:
				'4th character of each line in the HL7 must be a pipe character',
			severity: 5,
		});
	}
}

//test
function checkFieldNotEmpty(segment, nthField, failure) {
	return checkField(segment, nthField, '', failure, true);
}

function checkField(segment, nthField, regexAsString, failure, checkExist) {
	var re = new RegExp(regexAsString, 'g');
	// var line = getLineBySegment(segment); // Un-Comment back in once working

	arrayOfEachLine.forEach(item => {
		if (item.substring(0, 3) === segment) {
			let lastCharIndexOfNthField = item
				.split('|', nthField + 1)
				.join('|').length; //gets position of end of field
			let firstCharIndexOfNthField =
				item.split('|', nthField).join('|').length + 1; //gets position of start of field
			let fieldTextToValidate = item.substring(
				firstCharIndexOfNthField,
				lastCharIndexOfNthField,
			);
			console.log('fieldTextToValidate', fieldTextToValidate);
			if (checkExist && fieldTextToValidate === '') {
				pushFailureIfUnique(failure);
			}
			if (!re.test(fieldTextToValidate)) {
				pushFailureIfUnique(failure);
			}
		}
	});
}

function pushFailureIfUnique(newFailure) {
	var isUnique = failures.every(failure => {
		return failure != newFailure;
	});
	if (isUnique) {
		failures.push({
			description: newFailure.description,
			severity: newFailure.severity,
		});
	}
}

export default checker;
