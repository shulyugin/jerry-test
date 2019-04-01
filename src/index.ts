type RangeItem = [number, number];

interface IRangeList {
    add(range: RangeItem): void;
    remove(range: RangeItem): void;
    print(): void;
    toString(): string;
}

export class RangeList implements IRangeList {

  protected fullRange: number[] = [];

  add(range: RangeItem): void {
    let [leftIncl, rightExcl] = range;
    if (rightExcl - leftIncl <= 0) {
      // TODO: throw new Error('Invalid range.');
      return;
    }
    let rightIncl = rightExcl - 1;

    let leftIdx = this.findInsertIdx(leftIncl, this.fullRange);
    let rightIdx = this.findInsertIdx(rightIncl, this.fullRange);

    if (leftIdx % 2 === 1) {
      leftIdx -= 1;
      leftIncl = this.fullRange[leftIdx];
    } else if (leftIdx !== 0 && leftIncl - this.fullRange[leftIdx - 1] <= 1) {
      leftIdx -= 2;
      leftIncl = this.fullRange[leftIdx];
    }

    if (rightIdx % 2 === 1) {
      rightIncl = this.fullRange[rightIdx];
    } else if (rightIdx !== this.fullRange.length && this.fullRange[rightIdx] - rightIncl <= 1) {
      rightIdx += 1;
      rightIncl = this.fullRange[rightIdx];
    } else {
      rightIdx -= 1;
    }

    this.fullRange.splice(leftIdx, rightIdx - leftIdx + 1, leftIncl, rightIncl);
  }

  remove(range: RangeItem): void {
    let [leftIncl, rightExcl] = range;
    if (rightExcl - leftIncl <= 0) {
      // TODO: throw new Error('Invalid range.');
      return;
    }
    let rightIncl = rightExcl - 1;

    let leftIdx = this.findInsertIdx(leftIncl, this.fullRange);
    let rightIdx = this.findInsertIdx(rightIncl, this.fullRange);

    if (leftIdx % 2 === 0) {
      if (leftIdx !== 0) {
        leftIdx -= 1;
      }
      leftIncl = this.fullRange[leftIdx];
    } else {
      leftIncl -= 1;
    }

    if (rightIdx % 2 === 0) {
      if (rightIncl === this.fullRange[rightIdx]) {
        rightIncl += 1;
      } else {
        rightIncl = this.fullRange[rightIdx];
      }
      if (rightIdx !== this.fullRange.length) {
        rightIdx += 1;
      }
    } else {
      rightIncl += 1;
    }

    const insertValues = leftIdx === 0 ? [rightIncl] : [leftIncl, rightIncl];

    this.fullRange.splice(leftIdx, rightIdx - leftIdx, ...insertValues);
  }

  print(): void {
    console.log(`${this}`);
  }

  toString(): string {
    return this.fullRange.toString().replace(/((\-?\d+),(\-?\d+)),?/g, (_, range, left, right) => `[${left}, ${+right + 1}) `).trim();
  }

  protected findInsertIdx(value: number, fullRange: number[], idxDelta = 0): number {
    if (fullRange.length === 0) {
      return idxDelta;
    }
    const midIdx = Math.floor(fullRange.length / 2);
    const midValue = fullRange[midIdx];
    if (value === midValue) {
      return midIdx + idxDelta;
    }
    if (value > midValue) {
      return this.findInsertIdx(value, fullRange.slice(midIdx + 1), idxDelta + midIdx + 1);
    } else {
      return this.findInsertIdx(value, fullRange.slice(0, midIdx), idxDelta);
    }
  }
}

// Example run
const rl = new RangeList();

rl.add([1, 5]);
rl.print();
// Should display: [1, 5)

rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)

rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)

rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
