const assert = require('assert');
const flatten = require('lodash/flatten');
const langsData = require('../langs.json');

const languages = [
    ['0', '0', '0', '0'],
    ['haskell', 'fernando', '05ab1e', 'emojicode', 'aheui'],
    ['lazyk', 'mao', 'whitespace', 'fish', 'brainfuck-esomer', 'braintwist'],
    ['piet', 'produire', 'gs2', 'bubble-sort', 'vim'],
    ['1', '1', '1', '1'],
];

module.exports = flatten(languages).map((language, index) => {
	if (language === '0') {
		return {
			type: 'base',
			team: 0,
		};
	}

    if (language === '1') {
		return {
			type: 'base',
			team: 1,
		};
	}

	const langDatum = langsData.find((lang) => lang.slug === language);
	assert(language === '' || langDatum !== undefined, language);

	return {
		type: 'language',
		slug: language,
		name: langDatum ? langDatum.name : '',
		link: langDatum ? langDatum.link : '',
	};
});
