const fs = require('fs');

const parseLine = (line) => {
  let data = line.split(' ');
  const color = data.slice(0, 2).join('');
  // index 2 and 3 are [ bag, contain ]
  data = data.slice(4);
  const children = [];
  while (data.length) {
    const number = parseInt(data[0]);
    if (isNaN(number)) break;

    const color = data.slice(1, 3).join('');
    children.push({number, color});
    data = data.slice(4);
  }
  return {color, children};
};

const run1 = (arr) => {
  const results = new Set();
  const toCheck = ['shinygold'];
  while (toCheck.length) {
    const current = toCheck.pop();

    arr.forEach(bag => {
      if (results.has(bag.color)) return;
      const canContain = bag.children.find(c => c.color === current);
      if (canContain) {
        results.add(bag.color);
        toCheck.push(bag.color);
      }
    });
  }
  return results.size;
};

const countChildren = (arr, bag) => {
  if (!bag.children.length) return 0;

  return bag.children.reduce((acc, child) => {
    const bag = arr.find(b => b.color === child.color);
    return acc + child.number + (countChildren(arr, bag) * child.number);
  }, 0);
};
const run2 = (arr) => {
  const start = arr.find(bag => bag.color == 'shinygold');
  console.log(start);
  return countChildren(arr, start);
};

fs.readFile('seven.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(parseLine);

  console.log(run1(input));
  console.log(run2(input));
});
