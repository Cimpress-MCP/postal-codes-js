const fs = require('fs');
const countries = require('../data/countries.json');

const lookup = {};

Object
  .values(countries)
  .forEach(({alpha2, alpha3, numeric3}, index) => {
    lookup[alpha2] = index;
    lookup[alpha3] = index;
    lookup[numeric3] = index;
  });

fs.writeFileSync(
  `${__dirname}/../data/lookup.json`,
  JSON.stringify(lookup, null, 2)
);
