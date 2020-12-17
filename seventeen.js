const input = [
  ['#','#','.','.','#','#','#','#'],
  ['.','#','#','#','.','.','.','.'],
  ['#','.','#','#','#','.','#','#'],
  ['#','.','.','.','.','#','.','.'],
  ['.','.','.','#','.','.','#','.'],
  ['#','.','#','.','.','.','#','#'],
  ['.','.','#','.','#','.','#','.'],
  ['.','#','#','.','.','.','#','.']
];

const parse = () => {
  const active = new Set();
  input.forEach((row, y) => row.forEach((item, x) => {
    if (item === '#') active.add(`${x},${y},0,0`);
  }));
  return active;
};

const getNeighbors1 = (point, current) => {
  const [x, y, z] = point.split(',').map(n => parseInt(n));
  for (let x1 of [x - 1, x, x + 1]) 
    for (let y1 of [y - 1, y, y + 1]) 
      for (let z1 of [z - 1, z, z + 1])
        current.add(`${x1},${y1},${z1},0`);
  return current;
};

const getNeighbors2 = (point, current) => {
  const [x, y, z, w] = point.split(',').map(n => parseInt(n));
  for (let x1 of [x - 1, x, x + 1]) 
    for (let y1 of [y - 1, y, y + 1]) 
      for (let z1 of [z - 1, z, z + 1])
        for (let w1 of [w - 1, w, w + 1])
          current.add(`${x1},${y1},${z1},${w1}`);
  return current;
};

const getAllNeighbors = getNeighbors => (set) => Array.from(set.values())
  .reduce((acc, p) => getNeighbors(p, acc), new Set());

const cycle = (getNeighbors, cur) => {
  const next = new Set(cur.values());
  const all = getAllNeighbors(getNeighbors)(cur);
  for (let point of all.values()) {
    let neighbors = getNeighbors(point, new Set());
    neighbors.delete(point);
    let activeNeighbors = 0;
    for (let n of neighbors.values()) {
      if (cur.has(n)) activeNeighbors++;
    }
    if (cur.has(point) && (activeNeighbors < 2 || activeNeighbors > 3)) next.delete(point);
    if (!cur.has(point) && activeNeighbors === 3) next.add(point);
  }

  return next;
};

const run = (getNeighbors) => {
  let state = parse();
  let cycles = 6;
  while(cycles--) state = cycle(getNeighbors, state);
  return state.size;
};

console.log(run(getNeighbors1));
console.log(run(getNeighbors2));
