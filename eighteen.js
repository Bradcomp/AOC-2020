const fs = require('fs');
const add = (a, b) => a + b;
const mul = (a, b) => a * b;

const eval1 = (stack) => {
  let result = parseInt(stack.shift());
  while(stack.length) {
    const op = stack.shift();
    const next = parseInt(stack.shift());
    result = op === '*' ? result * next : result + next;
  }
  return result;
};
const eval2 = (stack) => {
  const groups = stack.join('').split('*').map(x => x.split('+').map(n => parseInt(n)));
  return groups.map(g => g.reduce(add, 0)).reduce(mul, 1);
};
const calc = (eval, line) => {
  const stack = [];
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '(') {
      const s = [];
      let depth = 1;
      while (depth) {
        i++;
        if (line[i] === '(') {
          depth++;
        }
        if (line[i] === ')') {
          depth--;
          if (!depth) break;
          
        }
        s.push(line[i]);
      }
      stack.push(calc(eval, s));
    } else stack.push(line[i]);
  }
  return eval(stack);
};
const run = (eval, arr) => arr.reduce((acc, line) => acc + calc(eval, line), 0);

fs.readFile('eighteen.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(l => l.split('').filter(x => x !== ' '));

  console.log(run(eval1, input));
  console.log(run(eval2, input));
});
