let maxNum = 100;
let step = 1;
let paused = false;
let stdFrame;

let slider;
let checkbox;
let imgCheckbox;
let button;
let resetButton;
let select;
let inputBox;
let fileInput;
let img;
let imgArr = [];

let mixed;
let sorter;

let timed;

function setup() {
	createCanvas(625, 625);
	background(0);
	//frameRate(1);

	setDom();

	reset();
	img = setImg();
	timed = false;
}

function draw() {
	if (!paused) {
		if (checkbox.checked()) {
			sortedArr = setSorter(select.value());
			sortedArr.sort();
			display(sortedArr.getSorted());
		} else if (!sorter.done) {
			for (let i = 0; i < step; i++) {
				sorter.step();
			}
			if (!timed) {
				console.time('sort');
				timed = true;
			};
			display(sorter.getCurrent(), sorter.getIterator());

		}
		else {
			if(timed) {console.timeEnd('sort'); timed = false;};
			display(sorter.getCurrent(), maxNum);
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
const display = function (arr, current) {
	let side = width / sqrt(maxNum);
	let i = 0;
	for (let row = 0; row < height / side; row++) {
		for (let col = 0; col < width / side; col++) {
			if (imgCheckbox.checked()) {
				noStroke();
				if (i == current) {
					fill(maxNum);
					noStroke();
					colorMode(HSB, maxNum);
					rect(col * side, row * side, side, side);
				} else {
					image(imgArr[arr[i]], col * side, row * side);
				}
			} else {
				if (i == current) {
					fill(maxNum);
				} else {
					fill(arr[i], maxNum, maxNum);
				}
				noStroke();
				colorMode(HSB, maxNum);
				rect(col * side, row * side, side, side);
			}
			i++;
		}
	}
}

const reset = function () {
	let options = [];
	for (let i = 0; i < maxNum; i++) {
		options[i] = i;
	}
	mixed = mixNumbers(options);
	display(mixed);
	sorter = setSorter(select.value());
}

const setSorter = function (type) {
	let out;
	if (type == "Bubble Sort") {
		out = new BubbleSort(mixed);
	} else if (type == "Selection Sort") {
		out = new SelectionSort(mixed);
	} else if (type == "Insertion Sort") {
		out = new InsertionSort(mixed);
	} else if(type == "Quicksort") {
		out = new Quicksort(mixed);
	}else {
		out = null;
	}

	return out
}

const processImage = function (image) {
	image.resize(width, height);

	let side = width / sqrt(maxNum);
	let i = 0;
	for (let row = 0; row < height / side; row++) {
		for (let col = 0; col < width / side; col++) {
			imgArr[i] = image.get(col * side, row * side, side + 1, side + 1);
			i++;
		}
	}
}

const imgFile = function (ifile) {
	if (ifile.type === 'image') {
		img = loadImage(ifile.data, processImage);
	}
}

const setImg = function () {
	let out;
	let rand = floor(random(3));

	switch (rand) {
		case 0:
			out = loadImage('images/pug.jpg', processImage);
			break;
		case 1:
			out = loadImage('images/cute cat.jpg', processImage);
			break;
		case 2:
			out = loadImage('images/cute dog.jpg', processImage);
			break;
	}

	return out;
}

function keyTyped() {
	if (key === ' ') {
		if (paused === false) {
			paused = true;
			button.html("Play");
		} else {
			paused = false;
			button.html("Pause");
		}
	}
}

const setDom = function () {
	createP('');
	let maxSqrt = sqrt(maxNum);
	slider = createSlider(1, maxSqrt, 1, maxSqrt / 10);
	slider.input(() => {
		step = pow(slider.value(), 2);
	});
	step = pow(slider.value(), 2);
	checkbox = createCheckbox("Realtime", false);
	imgCheckbox = createCheckbox("Image", false);
	imgCheckbox.position(100, width + 55);
	imgCheckbox.input(() => {
		processImage(img);
	});
	button = createButton("Pause");
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
	resetButton.mousePressed(reset);
	select = createSelect();
	select.option("Bubble Sort");
	select.option("Selection Sort");
	select.option("Insertion Sort");
	select.option("Quicksort");
	select.input(() => {
		reset();
		if (imgCheckbox.checked()) {
			processImage(img);
		}
	});
	createP('');
	inputBox = createInput("Size of Array");
	inputBox.style("width", "100px");
	inputBox.changed(() => {
		maxNum = inputBox.value();
		reset()
		if (imgCheckbox.checked()) {
			processImage(img);
		}
	});
	fileInput = createFileInput(imgFile);

	let allEls = selectAll('*');
	for (let el of allEls) {
		el.style("font-family", "OCR A Std, monospace");
	}
}