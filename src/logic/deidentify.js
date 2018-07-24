import checker from './checker.js';

var arrayOfEachLine = [];
const PIDlines = [
	'PID|0001||64012200^^^MRN||TEST^INLASTNAME^""^""^""^""|""|19440216|F|""^^^^^^|White|999 MADE UP ADDRESS^""^BRONX^NY^98765^US^^^KING||(555)000-6567|""|""|""|""|704079983^^^Account|""|^|~00000000||""||||',
	'PID|0001||94009768^^^MRN||TESTER^ADDISON^""^""^""^""|""|19401024|F|""^^^^^^|White|123 DISNEY LANE^""^BROOKLYN^NY^11219^US^^^KING||(399)283-5544~^NET^^ATEST@GMAIL.COM~(999)922-8509^^CP|""|ZHO|M|HI|8888079963^^^Account|678-45-3567|^|~00000000|Hispanic or Latino|""||||',
	'PID|0001||999991888^^^MRN||NOTAREALPERSON^LASDF^""^""^""^""|""|19640922|M|""^^^^^^|White|999 GARFIELD PLACE^""^BROOKLYN^NY^99999^US^^^KING||(999)998-9876~^NET^^MPASFAKETA@FAKETEST.COM|""|ENG|M|QU|704079889^^^Account|""|^|~00000000|Not Hispanic or Latino|""||||',
	'PID|0001||515151515153^^^MRN||FAKENAME^STASIK^""^""^""^""|""|19971111|M|""^^^^^^|White|145 TRAIN AVE^""^QUEENS^NY^40004^US^^^KING||(888)456-0978~^NET^^SR@YAHOO.COM|""|ENG|M|EP|999079917^^^Account|""|^|~00000000|Not Hispanic or Latino|""||||',
	'PID|0001||84013290^^^MRN||ROYAL^FAKELASTNAME^""^""^""^""|""|19561213|M|""^^^^^^|White|1313 BUSH ACE^""^NONEXISTENT^NY^11235^US^^^KING||(718)450-8967~^NET^^AR@YAHOOOO.COM~(999)378-5634^^CP|""|ENG|M|CH|704079915^^^Account|""|^|~00000000|Not Hispanic or Latino|""||||',
	'PID|0001||84008726^^^MRN||TEST^ABBOCH^""^""^""^""|""|20020630|M|""^^^^^^||123 MMC LANE^APT 2^DISNEY_LAND^NY^11219^US^^^KING||(718)283-5600|""|ENG|S|CH|704079931^^^Account|""|^|~00000000|Unknown|""||||',
	'PID|0001||84013290^^^MRN||ROYAL^ALEXANDER^""^""^""^""|""|19561213|M|""^^^^^^|White|1313 BUSH ACE^""^TEST_TEST^NY^11235^US^^^KING||(718)450-8967~^NET^^AR@YAHOOOOO.COM~(999)378-5634^^CP|""|ENG|M|CH|8888079915^^^Account|""|^|~00000000|Not Hispanic or Latino|""||||',
];

const deidentify = (textToDeidentify) => {
	return textToDeidentify.replace(getPIDLine(textToDeidentify), getRandomFromArray(PIDlines));
};

function getPIDLine(textToDeidentify) {
	let sol = '';
	arrayOfEachLine = textToDeidentify.split(/\n/).filter(str => {
		return str.trim().length > 0;
	});
	arrayOfEachLine.map(line => {
		if (line.substring(0, 3) === 'PID') {
			sol = line;
		}
	});
	if (sol !== '') {
		return sol;
	}
}

function getRandomFromArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}

export default deidentify;
