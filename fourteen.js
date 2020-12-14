const fs = require('fs');
const pad = require('left-pad');
const {add, zipWith, xprod} = require('ramda');


const parseLine = (line) => {
  const [a, b] = line.split(' = ');
  if (a === 'mask') {
    return {mask: b};
  }
  else {
    const addr = a.match(/[0-9]+/)[0];
    const val = parseInt(b);
    return {addr, val};
  }
}
const sum = vals => Object.values(vals).reduce(add, 0);
const run1 = (arr) => {
  const {vals} = arr.reduce(({vals, mask}, item) => {
    if (item.mask) return { vals, mask: item.mask.split('') };

    const bin = pad(item.val.toString(2), mask.length, '0').split('');
    const val = parseInt(zipWith((a, b) => a === 'X' ? b : a, mask, bin).join(''), 2);
    vals[item.addr] = val;
    return {mask, vals};

  }, {
    vals: {}, mask: ''
  });
  return sum(vals);
}
const getAddresses = (mask, address) => {
  const xIndex = mask.indexOf('X');
  if (xIndex < 0) return [address];

  const prefix = address.slice(0, xIndex);
  const remainder = address.slice(xIndex + 1);
  const prefixes = [prefix + '0', prefix + '1'];
  const suffixes = getAddresses(mask.slice(xIndex + 1), remainder);
  
  return xprod(prefixes, suffixes).map(pair => pair.join(''));

};
const run2 = (arr) => {
  
  const {vals} = arr.reduce(({vals, mask}, item) => {
    if (item.mask) return { vals, mask: item.mask.split('') };
    const addr = pad(parseInt(item.addr, 10).toString(2), mask.length, '0')
      .split('').map((c, i) => mask[i] === '1' ? '1' : c).join('');
    const addresses = getAddresses(mask, addr);
    for (let address of addresses) {
      vals[address] = item.val
    }
    return {vals, mask};
  }, {
    vals: {}, mask: ''
  });
  return sum(vals);
}
fs.readFile('fourteen.txt', (err, result) => {
  const input = result.toString().split('\n').filter(Boolean).map(parseLine);
  console.log(run1(input));
  console.log(run2(input));
});
