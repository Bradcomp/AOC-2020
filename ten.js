const fs = require('fs');
const {aperture, sortBy} = require('ramda');

const run1 = (arr) => {
  arr.unshift(0);
  const sorted = aperture(2, sortBy(n => n, arr));
  
  const {ones, threes} = sorted.reduce(({ones, threes}, [l, r]) => {
    if (r - l === 1) ones++;
    if (r - l === 3) threes++;
    return {ones, threes};
  }, {ones: 0, threes: 1});

  return ones * threes;
}
const run2 = (arr) => {
  const initial = {
    batches: [],
    batch: [],
    current: 0
  };

  const sorted = sortBy(n => n, arr);
  const result = sorted.reduce((acc, next) => {
    if (next - acc.current === 3) {
      acc.batches.push(acc.batch);
      acc.batch = [];
    }
    acc.batch.push(next);
    acc.current = next;
    return acc;
  }, initial);
  result.batches.push(result.batch);
  const possibilityMap = [1, 1, 1, 2, 4, 7];
  const possibilities = result.batches.reduce((acc, b) => acc * possibilityMap[b.length], 1);
  return possibilities;
}
fs.readFile('ten.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(x => parseInt(x));
  console.log(run1(input));
  console.log(run2(input));
});
