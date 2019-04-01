import { RangeList } from './';

describe('RangeList', () => {

  it('should correctly handle adding and removing ranges', () => {
    // Example run
    const rl = new RangeList();

    rl.add([1, 5]);
    expect(rl.toString()).toBe('[1, 5)');

    rl.add([10, 20]);
    expect(rl.toString()).toBe('[1, 5) [10, 20)');

    rl.add([20, 20]);
    expect(rl.toString()).toBe('[1, 5) [10, 20)');

    rl.add([20, 21]);
    expect(rl.toString()).toBe('[1, 5) [10, 21)');

    rl.add([2, 4]);
    expect(rl.toString()).toBe('[1, 5) [10, 21)');

    rl.add([3, 8]);
    expect(rl.toString()).toBe('[1, 8) [10, 21)');

    rl.remove([10, 10]);
    expect(rl.toString()).toBe('[1, 8) [10, 21)');

    rl.remove([10, 11]);
    expect(rl.toString()).toBe('[1, 8) [11, 21)');

    rl.remove([15, 17]);
    expect(rl.toString()).toBe('[1, 8) [11, 15) [17, 21)');

    rl.remove([3, 19]);
    expect(rl.toString()).toBe('[1, 3) [19, 21)');
  });
});
