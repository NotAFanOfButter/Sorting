class BubbleSort {
    constructor(arr) {
        this.mixed = arr;
        this.working = mixed.slice(0);
        this.sorted = [];
    }

    sort() {
        while(this.sorted.length < this.mixed.length) {
            for(let i = 0; i < this.working.length-1; i++) {
                if(this.working[i] > this.working[i+1]) {
                    swap(this.working[i], this.working[i+1]);
                }
            }
            this.sorted.unshift(this.working.pop());
        }
    }

    swap(left, right) {
        let temp = left;
        left = right;
        right = temp;
    }

    getArr() {
        return this.working + this.sorted;
    }
}