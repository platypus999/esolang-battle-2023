const assert = require('assert');

// ws|-B|py|-R|bf
// ja|no|gc|ph|oc
// --|-R|cl|-B|--
module.exports.getPrecedingIndices = (cellIndex) => {
	const width = 5;
	const height = 5;
	assert(cellIndex >= 0);
	assert(cellIndex < width * height);

	const x = cellIndex % width;
	const y = Math.floor(cellIndex / width);

	const cellExists = [
		[false, false, false, false, false],
		[true, true, true, true, true],
		[true, true, true, true, true],
		[false, true, true, true, false],
		[false, false, false, false, false],
	];

	const isValidCell = (xx, yy) => (xx >= 0 && xx < width && yy >= 0 && yy < height && cellExists[yy][xx]);

	const precedingCells = [];
	const dxys = [0, 1, 0, -1, 0];

	for (let i = 0; i < 4; i++) {
		const xx = x + dxys[i];
		const yy = y + dxys[i + 1];
		if (isValidCell(xx, yy)) {
			precedingCells.push(yy * width + xx);
		}
	}

	return precedingCells;
};

module.exports.generateInput = () => {
	const validInputs = [
		'xxxxxxxxxxxxxxxxxxxx',
		'xxxxxxxxxxxxxxxxx+xx',
		'xxxxxxxxxxxxxxxx+xxx',
		'xxxxxxxxxxxxxxx+xxxx',
		'xxxxxxxxxxxxxx+xxxxx',
		'xxxxxxxxxxxxxx+xx+xx',
		'xxxxxxxxxxxxx+xxxxxx',
		'xxxxxxxxxxxxx+xxx+xx',
		'xxxxxxxxxxxx+xxxxxxx',
		'xxxxxxxxxxxx+xxxx+xx',
		'xxxxxxxxxxxx+xxx+xxx',
		'xxxxxxxxxxx+xxxxxxxx',
		'xxxxxxxxxxx+xxxxx+xx',
		'xxxxxxxxxxx+xxxx+xxx',
		'xxxxxxxxxxx+xx+xx+xx',
		'xxxxxxxxxx+xxxxxxxxx',
		'xxxxxxxxxx+xxxxxx+xx',
		'xxxxxxxxxx+xxxxx+xxx',
		'xxxxxxxxxx+xxxx+xxxx',
		'xxxxxxxxxx+xxx+xx+xx',
		'xxxxxxxxx+xxxxxxx+xx',
		'xxxxxxxxx+xxxxxx+xxx',
		'xxxxxxxxx+xxxxx+xxxx',
		'xxxxxxxxx+xxxx+xx+xx',
		'xxxxxxxxx+xxx+xxx+xx',
		'xxxxxxxx+xxxxxxxx+xx',
		'xxxxxxxx+xxxxxxx+xxx',
		'xxxxxxxx+xxxxxx+xxxx',
		'xxxxxxxx+xxxxx+xxxxx',
		'xxxxxxxx+xxxxx+xx+xx',
		'xxxxxxxx+xxxx+xxx+xx',
		'xxxxxxxx+xxx+xxx+xxx',
		'xxxxxxxx+xx+xx+xx+xx',
		'xxxxxxx+xxxxxxx+xxxx',
		'xxxxxxx+xxxxxx+xxxxx',
		'xxxxxxx+xxxxxx+xx+xx',
		'xxxxxxx+xxxxx+xxx+xx',
		'xxxxxxx+xxxx+xxxx+xx',
		'xxxxxxx+xxxx+xxx+xxx',
		'xxxxxxx+xxx+xx+xx+xx',
		'xxxxxx+xxxxxx+xxxxxx',
		'xxxxxx+xxxxxx+xxx+xx',
		'xxxxxx+xxxxx+xxxx+xx',
		'xxxxxx+xxxxx+xxx+xxx',
		'xxxxxx+xxxx+xxxx+xxx',
		'xxxxxx+xxxx+xx+xx+xx',
		'xxxxxx+xxx+xxx+xx+xx',
		'xxxxx+xxxxx+xxxxx+xx',
		'xxxxx+xxxxx+xxxx+xxx',
		'xxxxx+xxxxx+xx+xx+xx',
		'xxxxx+xxxx+xxxx+xxxx',
		'xxxxx+xxxx+xxx+xx+xx',
		'xxxxx+xxx+xxx+xxx+xx',
		'xxxxx+xx+xx+xx+xx+xx',
		'xxxx+xxxx+xxxx+xx+xx',
		'xxxx+xxxx+xxx+xxx+xx',
		'xxxx+xxx+xxx+xxx+xxx',
		'xxxx+xxx+xx+xx+xx+xx',
		'xxx+xxx+xxx+xx+xx+xx',
		'xx+xx+xx+xx+xx+xx+xx',
	];

	// sample 50 elements from validInputs
	const lines = validInputs.sort(() => 0.5 - Math.random()).slice(0, 50);

	return `${lines.join('\n')}\n`;
};

module.exports.isValidAnswer = (input, output) => {
	const testCases = input.trim().split('\n');
	const expectedOutputs = testCases.map((line) => line.split('+').map((xs) => Array(xs.length).fill(xs.length - 1)).flat());
	const filteredOutputs = output.toString().replace(/[^+x\n]/g, '').trim().split('\n');
	const normalize = (polyString) => polyString.split('+').map((xs) => (xs.length > 0 && (/^[x]+$/g).test(xs)) ? xs.length : -1).sort((a,b)=>b-a);
	const normalizedOutputs = filteredOutputs.map(normalize);
	return JSON.stringify(expectedOutputs) === JSON.stringify(normalizedOutputs);
};
