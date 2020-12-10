const fs = require('fs');

const search = (path, [bottom, top], size) => {
  const partition = size / 2;
  const dir = path[0];
  if  (partition === 1) {
    return dir === 'u' ? top : bottom;
  }
  if (dir === 'u') bottom = bottom + partition;
  else top = top - partition;

  return search(path.slice(1), [bottom, top], partition); 
}

const parseLine = (line) => {
  line = line.split('');
  const rowPath = line.slice(0, 7).map(l => l === 'B' ? 'u' : 'd');
  const colPath = line.slice(7).map(l => l === 'R' ? 'u' : 'd');
  return {rowPath, colPath};
}

const run2 = (arr) => {
  const fullSeats = arr
    .map(parseLine)
    .map(({colPath, rowPath}) => {
      const row = search(rowPath, [0, 127], 128);
      const col = search(colPath, [0, 7], 8);
      return row * 8 + col;
    }).sort();

  for (let i = 1; i < fullSeats.length; i++) {
    if (fullSeats[i + 1] > (fullSeats[i] + 1)) {
      console.log(fullSeats[i] + 1);
    }
  }
}

fs.readFile('five.txt', (err, result) => {
  const input = result.toString().split('\n');
  run2(input);
});
