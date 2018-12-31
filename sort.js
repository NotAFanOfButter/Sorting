///<reference path="./p5.global-mode.d.ts" />

class BubbleSort {
    constructor(arr) {
        this.mixed = arr;
        this.working = this.mixed.slice(0);
        this.sorted = [];
        this.iterator = 0;
        this.done = false;
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

class InsertionSort {
    constructor(arr) {
        this.mixed = arr;
        this.working = this.mixed.slice(0);
        this.sorted = [];
        this.iterator = -1;
        this.latestIterator = -1;
        this.done = false;
    }

    sort() {
        while (this.sorted.length < this.mixed.length) {
            this.sorted.push(this.working.shift());
            let latestI = this.sorted.length - 1;
            for (let i = this.sorted.length - 1; i >= 0; i--) {
                if (this.sorted[i] > this.sorted[latestI]) {
                    let temp = this.sorted[i];
                    this.sorted[i] = this.sorted[latestI];
                    this.sorted[latestI] = temp;
                    latestI--;
                }
            }
        }
    }

    step() {
        if (this.sorted.length <= this.mixed.length) {
            if (this.iterator >= 0) {
                if (this.sorted[this.iterator] > this.sorted[this.latestIterator]) {
                    let temp = this.sorted[this.iterator];
                    this.sorted[this.iterator] = this.sorted[this.latestIterator];
                    this.sorted[this.latestIterator] = temp;
                    this.latestIterator--;
                }
                this.iterator--;
            } else {
                this.sorted.push(this.working.shift());
                this.iterator = this.sorted.length - 1;
                this.latestIterator = this.sorted.length - 1;
            }
        } else if (this.sorted.length >= this.mixed.length) {
            if (this.iterator >= 0) {
                if (this.sorted[this.iterator] > this.sorted[this.latestIterator]) {
                    let temp = this.sorted[this.iterator];
                    this.sorted[this.iterator] = this.sorted[this.latestIterator];
                    this.sorted[this.latestIterator] = temp;
                    this.latestIterator--;
                }
                this.iterator--;
            } else {
                this.sorted.push(this.working.shift());
                this.iterator = this.sorted.length - 1;
                this.latestIterator = this.sorted.length - 1;
            }

            this.done = true;
        }
    }

    getCurrent() {
        let out = this.sorted.concat(this.working)
        return out;
    }

    getSorted() {
        let out = this.sorted.slice(0);
        return out;
    }

    getIterator() {
        return this.iterator;
    }
}

class Quicksort {
    constructor(arr) {
        this.mixed = arr;
        this.working = this.mixed.slice(0);
        this.sorted = this.mixed.slice(0);
        this.iterator = 0;
        this.pivot = null;
        this.remFromStack = 2;
        this.remFromArr = 1;
        this.leftI;
        this.rightI;
        this.stage = 0;
        this.done = false;
        this.workingP = [];
        this.workingLR = [];
        this.stack = [];
        this.leftStuck = false;
        this.rightStuck = true;
    }

    sort() {
        this.qsort(this.sorted, 0, this.sorted.length - 1);
    }

    partition(a, l, r) {
        let p = l;
        let lStuck = false;
        let rStuck = false;
        if (a.length > 2) {
            while (l <= r) {
                if (!lStuck) {
                    if (a[l] > a[p]) {
                        lStuck = true;
                    } else {
                        l++;
                    }
                }

                if (!rStuck) {
                    if (a[r] < a[p]) {
                        rStuck = true;
                    } else {
                        r--;
                    }
                }

                if (lStuck && rStuck) {
                    let temp = a[l];
                    a[l] = a[r];
                    a[r] = temp;
                    lStuck = false;
                    rStuck = false;
                    l++;
                    r--;
                }
            }
            let temp = a[p];
            a[p] = a[r];
            a[r] = temp;

            return r;
        } else if (a.length == 2) {
            l = p;
            if (a[l] > a[r]) {
                let temp = a[l];
                a[l] = a[r];
                a[r] = temp;
            }
            return l;
        }
    }

    qsort(arr, left, right) {
        if (left < right) {
            let pd = this.partition(arr, left, right);
            this.qsort(arr, left, pd - 1);
            this.qsort(arr, pd + 1, right);
        }
    }

    qStep(front) {
        if (front) {
            if (this.stepPartition(this.working, this.workingLR[0], this.workingP[0])) {
                this.workingLR.splice(this.remFromArr, 1);
                this.workingP.splice(this.remFromArr, 1);
                this.stack.splice(this.remFromStack, 1);
            }
        } else {
            if (this.stepPartition(this.working, this.workingP[this.workingP.length - 1], this.workingLR[this.workingLR.length - 1])) {
                this.workingLR.splice(this.workingLR.length - 1 - this.remFromArr, 1);
                this.workingP.splice(this.workingP.length - 1 - this.remFromArr, 1);
                this.stack.splice(this.remFromStack, 1);
            }

        }
    }


    stepPartition(arr, left, right) {
        if (this.remFromStack == 0) {
            this.remFromStack = 2;
            this.remFromArr = 1;
        }
        if (this.pivot == null) {
            this.pivot = arr[left];
            this.pivotI = left;
            this.leftStuck = false;
            this.rightStuck = false;
            this.leftI = left + 1;
            this.rightI = right;
        } else {
            if (left == right || left > right || left < 0 || left > arr.length - 1 || right > arr.length - 1 || right < 0) {
                this.pivot = null;
                this.remFromArr = 0;
                this.remFromStack = 0;
                return true;
            } else {
                if (arr[this.leftI] > this.pivot && !this.leftStuck) {
                    this.leftStuck = true;
                } else if (!this.leftStuck) {
                    this.leftI++;
                }
                if (arr[this.rightI] < this.pivot && !this.rightStuck) {
                    this.rightStuck = true;
                } else if (!this.rightStuck) {
                    this.rightI--;
                }

                if (this.leftI > this.rightI) {
                    this.swap(arr, left, this.rightI);
                    this.pivot = null;
                    this.workingLR.unshift(left);
                    this.workingLR.push(right);
                    this.workingP.unshift(this.rightI - 1);
                    this.workingP.push(this.rightI + 1);
                    this.stack.unshift(true, false);
                    return true;
                }

                if (this.leftStuck && this.rightStuck) {
                    this.swap(arr, this.leftI, this.rightI);
                    this.leftStuck = false;
                    this.rightStuck = false;
                    this.leftI++;
                    this.rightI--;
                }
            }
        }
    }

    step() {
        if (this.sorted.toString() === this.mixed.toString()) {
            this.sort();
        } else {
            if (this.working.toString() != this.sorted.toString()) {
                switch (this.stage) {
                    case 0:
                        {
                            if (this.stepPartition(this.working, 0, this.working.length - 1)) {
                                this.stage++;
                            }
                            break;
                        }
                    case 1:
                        {
                            this.qStep(this.stack[0]);
                        }
                }
            } else {
                this.done = true;
            }
        }
    }

    swap(arr, i1, i2) {
        let temp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = temp;
    }

    getCurrent() {
        let out = this.working;
        return out;
    }

    getSorted() {
        let out = this.sorted.splice(0);
        return out;
    }

    getIterator() {
        return [this.leftI, this.rightI, this.pivotI];
    }
}