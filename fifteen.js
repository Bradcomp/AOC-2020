const input = [0,14,6,20,1,4];

const run = (threshold) => {
  let data = input.slice();
  let turn = data.length;
  let found = new Map([
    [0, [1]],
    [14, [2]],
    [6, [3]],
    [20, [4]],
    [1, [5]],
    [4, [6]]
  ]);
  
  let current = 4;
  while (turn < threshold){
    const locs = found.get(current);
    if (locs.length > 1) {
      current = locs[locs.length - 1] - locs[locs.length - 2];
    } else current = 0;
    turn++;
    let cur = found.get(current) || [];
    cur.push(turn);
    if (cur.length > 2) cur = cur.slice(1);
    found.set(current, cur);
    if (turn % 1000000 === 0) console.log(turn);
  }
  return current;
};



console.log(run(2020));
console.log(run(30000000));
