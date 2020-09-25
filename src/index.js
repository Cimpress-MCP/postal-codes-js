const countries = require('../data/countries.json');
const formats = require('../data/formats.json');
const lookup = require('../data/lookup.json');

/**
 * @param {string|number} countryCode
 * @param {string} postalCode
 * @return {boolean}
 */
module.exports.validate = function (countryCode, postalCode) {
  if (!countryCode) {
    throw new Error('Missing country code.');
  }

  if (!postalCode) {
    throw new Error('Missing postal code.');
  }


  const key = countryCode.trim().toUpperCase();
  const index = lookup[key];

  if (index === undefined) {
    throw new Error(`No data for [${countryCode}].`);
  }

  const country = countries[index];

  // Country does not have postal codes.
  if (country.postalCodeFormat === false) {
    return true;
  }

  const format = formats[country.postalCodeFormat];
  const validationRegex = new RegExp(format.validationRegex, 'i');
  const redundantChars = new RegExp(`[${format.redundantCharacters}]`, 'g');
  const preparedPostalCode = postalCode.toString().trim().replace(redundantChars, '');

  return validationRegex.test(preparedPostalCode);
}

module.exports.lookup = lookup;
