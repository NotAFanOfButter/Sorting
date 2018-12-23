const maxNum = 10;
function setup() {
	createCanvas(625, 625);
	background(0);

	let options = [];
	for(let i = 0; i < maxNum; i++) {
		options[i] = i;
	}

	console.log(mixNumbers(options));
}

function draw() {

}

const mixNumbers = function(options) {
	let mixed = [];
	const len = options.length
	for(let i = 0; i < len; i++) {
		mixed[i] = random(options);
		for(let j = 0; j < options.length; j++) {
			if(options[j] == mixed[i]) {
				options.splice(j,1);
			}
		}
	}

	return mixed;
}