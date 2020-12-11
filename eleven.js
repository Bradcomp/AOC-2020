const fs = require('fs');

const countNeighbors = (seats, x, y) => {
  const adj = [
    [x + 1, y], 
    [x, y + 1], 
    [x - 1, y], 
    [x, y - 1],
    [x + 1, y + 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x - 1, y - 1]
  ];

  return adj.reduce((acc, [x, y]) => 
    (seats[x] || [])[y] === '#' ? acc + 1 : acc,  0);
};
const scanNeighbors = (seats, x, y) => {
  const adj = [
    (x, y) => [x + 1, y], 
    (x, y) => [x, y + 1], 
    (x, y) => [x - 1, y], 
    (x, y) => [x, y - 1],
    (x, y) => [x + 1, y + 1],
    (x, y) => [x + 1, y - 1],
    (x, y) => [x - 1, y + 1],
    (x, y) => [x - 1, y - 1]
  ];

  return adj.reduce((acc, f) =>  {
    let [x1, y1] = f(x, y);
    while (true) {
      if (x1 < 0 || !seats[x1] || y1 < 0 || !seats[x1][y1]) return acc;
      const s = seats[x1][y1];
      if (s === 'L') return acc;
      if (s === '#') return acc + 1;
      [x1, y1] = f(x1, y1);
    }
  }, 0);
};
const checkSpot = (counter, threshold, seats, x, y) => {
  const current = seats[x][y];
  if (current === '.') return '.';
  const neighbors = counter(seats, x, y);
  if (neighbors >= threshold && current === '#') return 'L';
  if (neighbors === 0 && current === 'L') return '#';
  return current;
};
const modify = (seats, threshold, counter) => {
  const next = [];
  let modified = false;
  for (let x = 0; x < seats.length; x++) {
    const row = [];
    for (let y = 0; y < seats[0].length; y++) {
      const spot = checkSpot(counter, threshold, seats, x, y);
      if (spot !== seats[x][y]) modified = true;
      row.push(spot);
    }
    next.push(row);
  }
  return [next, modified];
}
const run1 = (arr) => {
  let [next, modified] = modify(arr, 4, countNeighbors);
  while(modified) [next, modified] = modify(next, 4, countNeighbors);
  return next.reduce((acc, row) => acc + row.reduce((acc, seat) => acc + (seat === '#' ? 1 : 0), 0), 0)
};
const run2 = (arr) => {
  let [next, modified] = modify(arr, 5, scanNeighbors);
  while(modified) [next, modified] = modify(next, 5, scanNeighbors);
  return next.reduce((acc, row) => acc + row.reduce((acc, seat) => acc + (seat === '#' ? 1 : 0), 0), 0)
};
fs.readFile('eleven.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(x => x.split(''));
  console.log(run1(input));
  console.log(run2(input));
});
