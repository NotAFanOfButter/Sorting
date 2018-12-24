class BubbleSort {
    constructor(arr) {
        this.mixed = arr;
        this.working = this.mixed.slice(0);
        this.sorted = [];
        this.iterator = 0;
        this.done= false;
    }

    sort() {
        while (this.sorted.length < this.mixed.length) {
            for (let i = 0; i < this.working.length - 1; i++) {
                if (this.working[i] > this.working[i + 1]) {
                    let temp = this.working[i];
                    this.working[i] = this.working[i + 1];
                    this.working[i + 1] = temp;
                }
            }
            this.sorted.unshift(this.working.pop());
        }
    }

    step() {
        if (this.sorted.length < this.mixed.length) {
            if (this.iterator < this.working.length) {
                if (this.working[this.iterator] > this.working[this.iterator + 1]) {
                    let temp = this.working[this.iterator];
                    this.working[this.iterator] = this.working[this.iterator + 1];
                    this.working[this.iterator + 1] = temp;

                }
                this.iterator++;
            } else {
                this.sorted.unshift(this.working.pop());
                this.iterator = 0;
            }
        } else {
            this.done = true;
        }
    }

    getCurrent() {
        let out = this.working.concat(this.sorted)
        return out;
    }

    getSorted() {
        let out = this.sorted.splice(0);
        return out;
    }

    getIterator() {
        return this.iterator;
    }
}

class SelectionSort {
    constructor(arr) {
        this.mixed = arr;
        this.working = this.mixed.slice(0);
        this.sorted = [];
        this.iterator = 0;
        this.minimumIndex = this.mixed.length - 1;
        this.minimum = this.mixed.length;
        this.done = false;
    }

    sort() {
        while (this.sorted.length < this.mixed.length) {
            let minI = this.mixed.length - 1;
            let min = this.mixed.length;
            for (let i = 0; i < this.working.length; i++) {
                if (this.working[i] < min) {
                    minI = i;
                    min = this.working[minI];
                }
            }
            this.sorted.push(this.working[minI]);
            this.working.splice(minI, 1);
        }
    }

    step() {
        if (this.sorted.length < this.mixed.length) {
            if (this.iterator < this.working.length) {
                if (this.working[this.iterator] < this.minimum) {
                    this.minimumIndex = this.iterator;
                    this.minimum = this.working[this.minimumIndex];
                }
                this.iterator++;
            } else {
                this.sorted.push(this.working[this.minimumIndex]);
                this.working.splice(this.minimumIndex, 1);

                this.iterator = 0;
                this.minimum = this.mixed.length;
                this.minimumIndex = this.mixed.length - 1;
            }
        } else {
            this.done = true;
        }

    }

    getCurrent() {
        let out = this.sorted.concat(this.working)
        return out;
    }

    getSorted() {
        let out = this.sorted.splice(0);
        return out;
    }

    getIterator() {
        return this.iterator + this.sorted.length;
    }
}