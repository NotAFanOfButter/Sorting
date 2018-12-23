const maxNum = 100;
let bubble;

function setup() {
	createCanvas(625, 625);
	background(0);

	let options = [];
	for (let i = 0; i < maxNum; i++) {
		options[i] = i;
	}

	let mixed = mixNumbers(options);
	display(mixed);

	bubble = new BubbleSort(mixed);
}

function draw() {
	bubble.step();
	display(bubble.getCurrent());
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
	noStroke();
	colorMode(HSB, maxNum)
	let side = width/sqrt(maxNum);
	let i = 0;
	for(let row = 0; row < height/side; row++) {
		for(let col = 0; col < width/side; col++) {
			fill(arr[i], maxNum, maxNum);
			rect(col*side, row*side, side, side);
			i++;
		}
	}
}