const fs = require('fs');
const {add, none, test, transpose, unnest} = require('ramda');
const rules = {
  departurelocation: [[28,184], [203,952]],
  departurestation: [[43,261], [283,958]],
  departureplatform: [[43,549], [564,970]],
  departuretrack: [[30,724], [732,970]],
  departuredate: [[37,650], [657,973]],
  departuretime: [[28,911], [922,965]],
  arrivallocation: [[41,855], [863,970]],
  arrivalstation: [[26,304], [324,970]],
  arrivalplatform: [[45,896], [903,963]],
  arrivaltrack: [[34,458], [466,962]],
  class: [[43,337], [363,954]],
  duration: [[33,239], [260,973]],
  price: [[34,600], [606,961]],
  route: [[25,686], [711,973]],
  row: [[36,101], [124,963]],
  seat: [[25,794], [806,949]],
  train: [[38,139], [164,952]],
  type: [[37,619], [627,956]],
  wagon: [[35,62], [75,963]],
  zone: [[40,479], [490,960]]
}
const myTicket = [89,137,223,97,61,167,181,53,179,139,211,127,229,227,173,101,83,131,59,79];

const allRanges = unnest(Object.values(rules));
const isBetween = (low, high, n) => (n <= high && n >= low);
const isInvalidField = (n) => allRanges.every(([low, high]) => !isBetween(low, high, n));
const run1 = (arr) => arr.reduce((acc, ticket) => acc.concat(ticket.filter(isInvalidField)), []).reduce(add, 0); 
const run2 = (arr) => {
  const validTickets = arr.filter(none(isInvalidField));
  // part 2 involved some pen & paper work to determine where stuff was - this got changed over time
  const relevantFields = Object.keys(rules).filter(r => ![
    'arrivaltrack', 'seat', 'type', 'train', 'class', 
    'arrivalstation', 'route', 'departuredate', 'departuretrack'

  ].includes(r));
  const byField = transpose(validTickets);
  console.log(byField[0]);
  const possibilities = byField.map(fieldArray => relevantFields.filter(field => {
    const ranges = rules[field];
    return fieldArray.every(fval => ranges.some(([low, high]) => isBetween(low, high, fval)));
  }));
  console.log(possibilities);
  
};
const parseLine = (line) => line.split(',').map(x => parseInt(x));

fs.readFile('sixteen.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(x => parseLine(x));
  console.log(run1(input));
  console.log(run2(input));
});
