class BubbleSort {
    constructor(arr) {
        this.mixed = arr;
        this.working = this.mixed.slice(0);
        this.sorted = [];
        this.iterator = 0;
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
        }
    }

    getCurrent() {
        let out = this.working.concat(this.sorted)
        return out;
    }
}