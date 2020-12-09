const fs = require('fs');
const {allPass, both, difference, fromPairs} = require('ramda');

const parseLine = (line) => {
  const kvps = line.split(' ').map(p => p.split(':'));
  return fromPairs(kvps);

}

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const validatePassport = (passport) => {
  return difference(requiredFields, Object.keys(passport)).length === 0;
}
const byr = (passport) => parseInt(passport.byr) > 1919 && parseInt(passport.byr) < 2003;
const iyr = (passport) => parseInt(passport.iyr) > 2009 && parseInt(passport.iyr) < 2021;
const eyr = (passport) => parseInt(passport.eyr) > 2019 && parseInt(passport.eyr) < 2031;
const hgt = (passport) => {
  const val = parseInt(passport.hgt);
  if (/cm$/.test(passport.hgt)) { return val > 149 && val < 194; }
  if (/in$/.test(passport.hgt)) { return val > 58 && val < 76; }
  return false;
}
const hcl = (passport) => /^#[a-f0-9]{6}$/.test(passport.hcl);
const ecl = (passport) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl);
const pid = (passport) => /^[0-9]{9}$/.test(passport.pid);
const validateFields = allPass([byr, iyr, eyr, hgt, hcl, ecl, pid]);

const processInput = lines => {
  const result = lines.reduce((acc, line) => {
    if (line.trim() === '') {
      acc.passports.push(acc.currentPassport);
      acc.currentPassport = {};
    } else {
      Object.assign(acc.currentPassport, parseLine(line));
    }
    return acc;
    
  }, {
    passports: [],
    currentPassport: {}
  });
  return result.passports;
};

fs.readFile('four.txt', 'ascii', (err, result) => {
  // An array of boolean where true means tree
  const input = result
    .split('\n');

  const passports = processInput(input);
  const answer = passports.filter(both(validatePassport, validateFields));
  console.log(answer.length);
});

