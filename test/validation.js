const postalCodes = require('../src/index');
const expect = require('chai').expect;
const countries = require('../data/countries.json');
const tests = require('../data/tests.json');

describe('Postal codes validation: ', () => {

  Object.values(countries).forEach((country) => {
    if (country.postalCodeFormat === false) {
      it(country.alpha2 + ' is valid', () => {
        expect(postalCodes.validate(country.alpha2, 'abc')).to.be.true;
      });
      return;
    }

    const data = tests[country.postalCodeFormat];

    data.valid.forEach(function (validPostalCode) {
      it(country.alpha2 + ' / ' + validPostalCode + ' is valid', () => {
        expect(postalCodes.validate(country.alpha2, validPostalCode)).to.be.true;
      })
    });

    data.invalid.forEach(function (invalidPostalCode) {
      it(country.alpha2 + ' / ' + invalidPostalCode + ' is invalid', () => {
        expect(postalCodes.validate(country.alpha2, invalidPostalCode)).to.be.false;
      })
    });
  });
});
