const assert = require('assert');
const _ = require('lodash');

module.exports.getPrecedingIndices = (cellIndex) => {

    const coords = [
        [-2, 0], [-2, 1], [-2, 2], [-2, 3],
        [-1, -1], [-1, 0], [-1, 1], [-1, 2], [-1, 3],
        [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3],
        [1, -2], [1, -1], [1, 0], [1, 1], [1, 2],
        [2, -2], [2, -1], [2, 0], [2, 1]
    ];

    const precedingCells = [...Array(coords.length).keys()].filter((num) => (num != cellIndex));

	return precedingCells;
};

module.exports.generateInput = () => {
    const letter = _.sample("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
	return `${letter}\n`;
};

module.exports.isValidAnswer = (input, output) => {
    const inputChar = input[0];
	const outArray = [...output.toString()].filter((c) => !c.match(/^\s$/)).map((c) => c.toUpperCase());
    return outArray.length === 100 && outArray.every((value) => value === inputChar);
};
