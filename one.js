const {xprod} = require("ramda");
const fs = require('fs');
const run1 = (arr) => xprod(arr, arr).map(([x, y]) => {
  if (x + y === 2020) console.log(x * y);
});
const run2 = (arr) => arr.forEach((x, a) => {
  arr.slice(a).forEach((y, b) => {
    arr.slice(b).forEach(z => {
      if (x + y + z === 2020) console.log(x * y * z)
    })
  })
});
fs.readFile('one.txt', (err, result) => {
  const input = result.toString().split('\n').map(x => parseInt(x));
  run2(input);
});
