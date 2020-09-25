const postalCodes = require('../src/index');
const expect = require('chai').expect;

describe('Argument validation:', () => {
  it('throws when args are missing', () => {
    expect(() => {
      postalCodes.validate(undefined, '1234ab');
    }).to.throw('Missing country code.');

    expect(() => {
      postalCodes.validate('NL', undefined);
    }).to.throw('Missing postal code.');
  });

  it('throws for invalid countries', () => {
    expect(() => {
      postalCodes.validate('nope', '1234ab');
    }).to.throw('No data for [nope].');
  });

  it('should accept different keys', () => {
    expect(postalCodes.validate('NL', '1234ab')).to.be.true;
    expect(postalCodes.validate('NLD', '1234ab')).to.be.true;
    expect(postalCodes.validate('528', '1234ab')).to.be.true;
  });

  it('should normalize keys', () => {
    expect(postalCodes.validate('  NL  ', '1234ab')).to.be.true;
    expect(postalCodes.validate('nlD', '1234ab')).to.be.true;
    expect(postalCodes.validate(528, '1234ab')).to.be.true;
  });

  it('should normalize the postal codes', () => {
    expect(postalCodes.validate('NL', ' 1234-ab ')).to.be.true;
    expect(postalCodes.validate('NOR', 1234)).to.be.true;
  });
});
