const fs = require('fs');
const parseLine = (line) => {
  let [range, letter, pw] = line.split(' ');

  range = range.split('-').map(x => parseInt(x));
  letter = letter[0];

  return {letter, range, pw};
};

const countLetter = (letter, pw) => pw.split('').reduce(((acc, l) => l === letter ? acc + 1 : acc), 0);
const isValid = ({letter, range, pw}) => {
  const count = countLetter(letter, pw);
  return count >= range[0] && count <= range[1];
};
const isValid2 = ({letter, range, pw}) => {
  let isValid = false;
  let pwArr = pw.split('');
  if (pw[range[0] - 1] === letter) isValid = !isValid;
  if (pw[range[1] - 1] === letter) isValid = !isValid;
  return isValid;
};

const run1 = (arr) => arr.map(isValid).filter(Boolean).length;
const run2 = (arr) => arr.map(isValid2).filter(Boolean).length;


fs.readFile('two.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(x => parseLine(x));
  console.log(run2(input));
});
