const fs = require('fs');

const run1 = (xstep, arr) => {
  let x = -xstep;
  return arr.reduce((acc, row) => {
    x = (x + xstep) % row.length;
    return acc + (row[x] === '#' ? 1 : 0);
  }, 0);
};

const run2 = ( arr) => {
  const xstep = 1;
  let x = -1;
  return arr.reduce((acc, row, ndx) => {
    if (ndx % 2) return acc;
    x = (x + xstep) % row.length;
    return acc + (row[x] === '#' ? 1 : 0);
  }, 0);
};
fs.readFile('three.txt', 'ascii', (err, result) => {
  // An array of boolean where true means tree
  const input = result
    .split('\n')
    .filter(Boolean)
    .map(x => x.split(''));

  const a = run1(1, input);
  const b = run1(3, input);
  const c = run1(5, input);
  const d = run1(7, input);
  const e = run2(input);
  console.log(a * b * c * d * e);
});
