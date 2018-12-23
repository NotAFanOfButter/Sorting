const maxNum = 4;

function setup() {
	createCanvas(625, 625);
	background(0);

	let options = [];
	for (let i = 0; i < maxNum; i++) {
		options[i] = i;
	}

	let mixed = mixNumbers(options);
	display(mixed);
}

function draw() {

}

const mixNumbers = function (options) {
	let mixed = [];
	const len = options.length
	for (let i = 0; i < len; i++) {
		mixed[i] = random(options);
		for (let j = 0; j < options.length; j++) {
			if (options[j] == mixed[i]) {
				options.splice(j, 1);
			}
		}
	}

	return mixed;
}
const display = function (arr) {
	let side = width/sqrt(maxNum);
	let i = 0;
	for(let row = 0; row < height/side; row++) {
		for(let col = 0; col < width/side; col++) {
			colorMode(HSB, maxNum)
			fill(arr[i], maxNum, maxNum);
			noStroke();
			rect(col*side, row*side, side, side);
			i++;
		}
	}
}