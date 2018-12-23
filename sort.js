class BubbleSort {
    constructor(arr) {
        this.mixed = arr;
        this.working = this.mixed.slice(0);
        this.sorted = [];
    }

    sort() {
        while(this.sorted.length < this.mixed.length) {
            for(let i = 0; i < this.working.length-1; i++) {
                if(this.working[i] > this.working[i+1]) {
                    let temp = this.working[i];
                    this.working[i] = this.working[i+1];
                    this.working[i+1] = temp;
                }
            }
            this.sorted.unshift(this.working.pop());
        }
    }
}