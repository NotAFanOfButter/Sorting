let maxNum = 100;
let step = 1;
let paused = false;

let slider;
let checkbox;
let button;
let resetButton;

let mixed;
let bubble;

function setup() {
	createCanvas(625, 625);
	background(0);

	slider = createSlider(1, maxNum, 1, maxNum / 10);
	slider.position(0, 630);
	checkbox = createCheckbox("Instant", false);
	checkbox.position(150, 632);
	button = createButton("Pause");
	button.position(225, 632);
	button.mousePressed(() => {
		if (paused == false) {
			paused = true;
			button.html("Play");
		} else {
			paused = false;
			button.html("Pause");
		}
	});
	resetButton = createButton("Reset");
	resetButton.position(280, 632);
	resetButton.mousePressed(() => {
		let options = [];
		for (let i = 0; i < maxNum; i++) {
			options[i] = i;
		}
		mixed = mixNumbers(options);
		display(mixed);
		bubble = new BubbleSort(mixed);
	});

	let options = [];
	for (let i = 0; i < maxNum; i++) {
		options[i] = i;
	}

	mixed = mixNumbers(options);
	display(mixed);

	bubble = new BubbleSort(mixed);
}

function draw() {
	if (!paused) {
		if (checkbox.checked()) {
			let sortedBubble = new BubbleSort(mixed);
			sortedBubble.sort();
			display(sortedBubble.getSorted());
		} else {
			step = slider.value();

			for (let i = 0; i < step; i++) {
				bubble.step();
			}
			display(bubble.getCurrent());
		}
	}
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
	let side = width / sqrt(maxNum);
	let i = 0;
	for (let row = 0; row < height / side; row++) {
		for (let col = 0; col < width / side; col++) {
			fill(arr[i], maxNum, maxNum);
			rect(col * side, row * side, side, side);
			i++;
		}
	}
}