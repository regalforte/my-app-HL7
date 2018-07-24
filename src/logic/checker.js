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
	ensureInputIsNotCCD();
	checkCONSegmentOnlyExistsInLastSegment();

	//regex validations:
	checkField('EVN', 1, '^A\\d\\d$', {
		description: 'Event type code should be A followed by 2 digits',
		severity: 1,
		segment: 'EVN',
		field: 1
	});
	checkField('PID', 5, '^[A-Za-z^".]+$', {
		description: 'Numbers or unexpected symbols detected in patient name',
		severity: 1,
		segment: 'PID',
		field: 5
	});
	checkField('PID', 8, '^[A-Za-z]$', {
		description: 'Gender should consist of one letter',
		severity: 2,
		segment: 'PID',
		field: 8
	});
	checkField('PID', 7, '^\\d{8}$', {
		description:
			'DOB should consist of at least exactly 8 digits (no letters, no symbols)',
		severity: 2,
		segment: 'PID',
		field: 7
	});
	checkField('PID', 11, '^.+(US|United State).+$', {
		description: 'Country should be US',
		severity: 1,
		segment: 'PID',
		field: 11
	});
	checkField('CON', 11, '^.$', {
		description: 'Consent value should be a single character',
		severity: 3,
		segment: 'CON',
		field: 11
	});
	checkField('CON', 14, '^\\d{8}', {
		description:
			'Consent effective date should consist of at least 8 digits (no letters, no symbols)',
		severity: 2,
		segment: 'CON',
		field: 14
	});

	//not empty validations:
	checkFieldNotEmpty('MSH', 3, {
		description: 'Sending facility namespace ID should not be left blank',
		severity: 7,
		segment: 'MSH',
		field: 3,
		mandatoryFixRequired: true
	});
	checkFieldNotEmpty('PID', 3, {
		description: 'MRN field should not be left blank',
		severity: 8,
		segment: 'PID',
		field: 3,
		mandatoryFixRequired: true
	});
	checkFieldNotEmpty('EVN', 1, {
		description: 'EVENT TYPE CODE field should not be left blank',
		severity: 8,
		segment: 'EVN',
		field: 1,
		mandatoryFixRequired: true
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

const ensureInputIsNotCCD = () => {
	if (arrayOfEachLine[0].substring(0,1) === '<') {
		pushFailureIfUnique({
			description: 'Wrong data type detected. This tool only validates HL7\'s. For CCDs, use Diameter Health instead',
			severity: 70
		})
	}
}

const checkCONSegmentOnlyExistsInLastSegment = () => {
	arrayOfEachLine.map((eachLine, index) => {
		if (index === arrayOfEachLine.length -1) {
			return;
		}
		if (eachLine.substring(0, 3) === 'CON') {
			pushFailureIfUnique({
				description: 'CON segment detected on a line other than the very last one',
				severity: 5
			})
		}
	});
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
			segment: newFailure.segment,
			field: newFailure.field,
			mandatoryFixRequired: newFailure.mandatoryFixRequired
		});
	}
}

export default checker;
