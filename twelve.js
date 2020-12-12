const fs = require('fs');

const parseLine = line => {
  const action = line[0];
  const value = parseInt(line.slice(1));
  return {action, value};
};

const move = ({face, x, y}, op) => {
  let action = op.action === 'F' ? face: op.action;
  const dirs = ['N', 'E', 'S', 'W'];
  switch (action) {
    case 'N':
      return {face, x, y: y + op.value};
    case 'S':
      return {face, x, y: y - op.value};
    case 'E':
      return {face, x: x + op.value, y};
    case 'W':
      return {face, x: x - op.value, y};
    case 'L':
    case 'R':
      let rot = (op.value / 90);
      if (op.action === 'L') rot = -rot;
      let cur = (dirs.indexOf(face) + rot) % 4;
      if (cur < 0) cur = cur + 4;
      return {face: dirs[cur], x, y};
  }
};

const calculateQuadrant = (x, y) => {
  if (x >= 0) return y >= 0 ? 0 : 3;
  return y >= 0 ? 1 : 2;
};
const rotateWaypoint = (x, y, rot, dir) => {
  rot = rot / 90;
  if (rot === 2) return {wayxnew: -x, wayynew: -y};
  let quadrant = (calculateQuadrant(x, y) + (dir === 'L' ? rot : -rot)) % 4;
  if (quadrant < 0) quadrant = quadrant + 4;
  let wayxnew = Math.abs(y);
  let wayynew = Math.abs(x);
  switch (quadrant) {
    case 0: return {wayxnew, wayynew};
    case 1: return {wayxnew: -wayxnew, wayynew};
    case 2: return {wayxnew: -wayxnew, wayynew: -wayynew};
    case 3: return {wayxnew, wayynew: -wayynew};
  }
  
}
const move2 = ({wayx, wayy, x, y}, op) => {
  console.log({wayx, wayy, x, y}, op);
  switch (op.action) {
    case 'N':
      return {wayx, wayy: wayy + op.value, x, y}
    case 'S':
      return {wayx, wayy: wayy - op.value, x, y}
    case 'E':
      return {wayx: wayx + op.value, wayy, x, y}
    case 'W':
      return {wayx: wayx - op.value, wayy, x, y}
    case 'L':
    case 'R':
      const {wayxnew, wayynew} = rotateWaypoint(wayx, wayy, op.value, op.action);
      return {wayx: wayxnew, wayy: wayynew, x, y};
    case 'F': 
      x = x + (op.value * wayx);
      y = y + (op.value * wayy);
      return {wayx, wayy, x, y};
  }
};

const run1 = (arr) => {
  const {x, y} = arr.reduce(move, {face: 'E', x: 0, y: 0})
  console.log({x, y});
  return Math.abs(x) + Math.abs(y);
};
const run2 = (arr) => {
  const {x, y} = arr.reduce(move2, {wayx: 10, wayy: 1,  x: 0, y: 0})
  console.log({x, y});
  return Math.abs(x) + Math.abs(y);
};

fs.readFile('twelve.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(x => parseLine(x));
  console.log(run1(input));
  console.log(run2(input));
});
