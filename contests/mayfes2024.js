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

    const invCoords = {}
    coords.forEach((val, index) => {invCoords[val] = index; });

	const precedingCells = [];
    const pushToSet = (x, y) => {
        if ([x,y] in invCoords) {
            precedingCells.push(invCoords[[x, y]]);
        }
    };

    const x = coords[cellIndex][0];
    const y = coords[cellIndex][1];
    pushToSet(x-1,y);
    pushToSet(x-1,y+1);
    pushToSet(x,y-1);
    pushToSet(x,y+1);
    pushToSet(x+1,y-1);
    pushToSet(x+1,y);

	return precedingCells;
};

module.exports.generateInput = () => {
	return "";
};

module.exports.isValidAnswer = (input, output) => {
	const outArray = [...output.toString()].filter((c) => c.match(/^[A-Za-z]$/)).map((c) => c.toUpperCase());
	return ["T"].toString() === outArray.toString();
};
