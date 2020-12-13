const {allPass} = require('ramda');
const startTime = 1000510;
const x = 'x';
const busses = [19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,x,x,x,x,x,x,x,x,x,x,29,x,853,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23];


const run1 = () => busses.filter(b => b !== x).reduce((acc, bus) => {
  const math = Math.ceil(startTime / bus);
  const current = math * bus - startTime;
  if (current < acc.current) return { current, bus };
  return acc;
}, { current: Infinity, bus: 0 });

const run2 = (startingPoint, busses, keyIndices) => {
  const indexedBusses = busses.reduce((acc, bus, i) => {
    if (bus === x) return acc;
    return acc.concat([{isValid: (t) => ((t + i) % bus) === 0, bus, i}]);
  }, []);
  let increment = Math.max(...keyIndices.map(i => busses[i]));
  let t = Math.ceil(startingPoint / increment) * increment - busses.indexOf(increment); 
  let indexedKeyIndices = indexedBusses.filter(b => keyIndices.includes(b.i));
  while (true) {
    let found = true;
    for (let i = 0; i < indexedKeyIndices.length; i++) {
      let bus = indexedKeyIndices[i];
      if (bus.isValid(t)) {
        continue;
      }
      while (!bus.isValid(t))
        t = t + increment;
      found = false;
    }
    if (found) {
      increment = keyIndices.reduce((acc, i) => acc * busses[i], 1);
      break;
    }
  }
  while (true) {
    let found = true;
    for (let i = 0; i < indexedBusses.length; i++) {
      let bus = indexedBusses[i];
      if (bus.isValid(t)) {
        continue;
      }
      while (!bus.isValid(t))
        t = t + increment;
      found = false;
    }
    if (found) return t;
  }
}

console.log(run1());

console.log(run2(1000000, [7,13,x,x,59,x,31,19], [0, 7]));
console.log(run2(100000000000000, busses, [9, 37, 50]));
//1895431131329359
//100000000000000
