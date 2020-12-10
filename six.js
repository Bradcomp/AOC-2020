const fs = require('fs');
const {intersection} = require('ramda');

const processInput1 = lines => {
  const result = lines.reduce((acc, line) => {
    if (line.trim() === '') {
      acc.groups.push(acc.currentGroup);
      acc.currentGroup = new Set();
    } else {
      line.split('').forEach(l => acc.currentGroup.add(l));
    }
    return acc;
    
  }, {
    groups: [],
    currentGroup: new Set()
  });
  return result.groups;
};

const processInput2 = lines => {
  const result = lines.reduce((acc, line) => {
    if (line.trim() === '') {
      acc.groups.push(new Set(acc.currentGroup.reduce(intersection)));
      acc.currentGroup = [];
    } else {
        acc.currentGroup.push(line.split(''));
    }
    return acc;
    
  }, {
    groups: [],
    currentGroup: []
  });
  return result.groups;
};
const run1 = (arr) => {
  const groups = processInput1(arr);
  return groups.reduce((acc, grp) => acc + grp.size, 0);
}

const run2 = (arr) => {
  const groups = processInput2(arr);
  return groups.reduce((acc, grp) => acc + grp.size, 0);
}

fs.readFile('six.txt', 'ascii', (err, result) => {
  // An array of boolean where true means tree
  const input = result
    .split('\n');

  console.log(run2(input));
});

