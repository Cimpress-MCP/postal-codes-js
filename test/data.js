const expect = require('chai').expect;
const countries = require('../data/countries.json');
const formats = require('../data/formats.json');
const lookup = require('../data/lookup.json');
const tests = require('../data/tests.json');

const usedFormats = new Set(countries.map(({postalCodeFormat}) => postalCodeFormat));
// false is not an actual format.
usedFormats.delete(false);

describe('Data validation:', () => {

  describe('Countries:', () => {
    countries.forEach((country, index) => {

      describe(country.alpha2, () => {
        if (country.postalCodeFormat !== false) {
          it(`should have a format`, () => {
            expect(formats[country.postalCodeFormat]).to.be.an('object');
          });
        }

        it(`should have a lookup`, () => {
          expect(lookup[country.alpha2]).to.be.a('number')
            .and.to.equal(index);
          expect(lookup[country.alpha3]).to.be.a('number')
            .and.to.equal(index);
          expect(lookup[country.numeric3]).to.be.a('number')
            .and.to.equal(index);
        });
      });
    });
  });

  describe('Formats:', () => {
    Object.entries(formats).forEach(([name, format]) => {
      describe(name, () => {
        it(`should be complete`, () => {
          expect(format.validationRegex).to.be.a('string').and.not.be.empty;
          expect(format.redundantCharacters).to.be.a('string');
        })

        it(`should have tests`, () => {
          const countryTests = tests[name]

          expect(countryTests).to.be.an('object');
          expect(countryTests.valid).to.be.an('array').and.not.be.empty;
          expect(countryTests.invalid).to.be.an('array').and.not.be.empty;
        });

        it(`should be used`, () => {
          expect(usedFormats.has(name)).to.be.true;
        });
      });
    });
  });

  it('should use all tests', () => {
    expect(Object.keys(tests)).to.be.lengthOf(Object.keys(formats).length);
  });

  it('should use all lookups', () => {
    // alpha2, alpha3, numeric3
    const lookupTypes = 3;

    expect(Object.keys(lookup)).to.be.lengthOf(countries.length * lookupTypes);
  });
});



