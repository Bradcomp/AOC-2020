const fs = require('fs');

const parseLine = (line, ndx) => {
  const data = line.split(' ');
  const op = data[0];
  const arg = parseInt(data[1]);
  return {op, arg, ndx};
}

const run1 = (arr) => {
  let acc = 0;
  let ip = 0;
  let visited = new Set();
  const processOp = (op) => {
    switch (op.op) {
      case 'acc': acc = acc + op.arg;
      case 'nop': return ip + 1;
      case 'jmp': return ip + op.arg;
    }
  }

  while (ip >= 0 && ip < arr.length) {

    const current = arr[ip];
    if (visited.has(current.ndx)) {
      return acc;
    }
    visited.add(current.ndx);
    ip = processOp(current);
  }
  return acc;
};
const checkProgram = (arr) => {
  let acc = 0;
  let ip = 0;
  let visited = new Set();
  const processOp = (op) => {
    switch (op.op) {
      case 'acc': acc = acc + op.arg;
      case 'nop': return ip + 1;
      case 'jmp': return ip + op.arg;
    }
  }

  while (ip >= 0 && ip < arr.length) {

    const current = arr[ip];
    if (visited.has(current.ndx)) {
      return false;
    }
    visited.add(current.ndx);
    ip = processOp(current);
  }
  return acc;
}
const run2 = (arr) => {
  let result = false;
  arr.forEach(op => {
    let o = op.op;
    if (result !== false || o === 'acc') return;
    op.op = o === 'nop' ? 'jmp' : 'nop';
    result = checkProgram(arr);
    op.op = o;
  });
  return result
};

fs.readFile('eight.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(parseLine);

  console.log(run1(input));
  console.log(run2(input));
});
