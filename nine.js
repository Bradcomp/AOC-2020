const fs = require('fs');
const {aperture, xprod} = require('ramda');
const preambleLength = 25;

const findSum = (total, candidates) => xprod(candidates, candidates).reduce((acc, pair) => {
  if (acc) return acc;
  if (pair[0] + pair[1] === total) return total;
  return acc;
}, false);
const run1 = (arr) => {
  const data = aperture(preambleLength + 1, arr);
  return data.reduce((acc, xs) => {
    if (acc) return acc;

    const x = xs.pop();
    if (!findSum(x, xs)) return x;
    return false;
  }, false);

};

const run2 = (arr) => {
  // from part 1
  const target = 26796446;
  for (let i = 0; i < arr.length; i++) {
    let total = arr[i];
    let next = i + 1;
    while (total < target) {
      total += arr[next];
      next++;
    }
    if (total === target) {
      const range = arr.slice(i, next);
      range.sort();
      return range[0] + range[range.length - 1];
    }
  }
}
fs.readFile('nine.txt', (err, result) => {
  const input = result.toString().split('\n').map(x => parseInt(x));
  console.log(run2(input));
});
