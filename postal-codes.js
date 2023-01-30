'use strict';

const byAlpha2 = require('./generated/postal-codes-alpha2.json');
const byAlpha3 = require('./generated/postal-codes-alpha3.json');
const isNode = require('detect-node');

var getFormat = null;
if ( isNode ) {
    getFormat = require("./formats-node");
} else {
    getFormat = require("./formats-web");
}

module.exports.validate = function (countryCode, postalCode, options) {
    if ( !countryCode ) {
        return "Missing country code.";
    }

    if ( !postalCode ) {
        return 'Missing postal code.';
    }

    var countryData = undefined;
    var preparedCountryCode = countryCode.trim().toUpperCase();

    // Is it alpha2 ?
    if ( preparedCountryCode.length == 2 ) {
        countryData = byAlpha2[preparedCountryCode];
    }

    // Is it alpha3 ?
    if ( preparedCountryCode.length == 3 ) {
        countryData = byAlpha3[preparedCountryCode];
    }

    if ( !countryData ) {
        return 'Unknown alpha2/alpha3 country code: ' + preparedCountryCode;
    }

    // If the country/region does not use postal codes
    if ( !countryData.postalCodeFormat ) {
        return true;
    }

    if (options && options.forceFormatWeb && isNode){
        getFormat = require("./formats-web")
    }

    var format = getFormat(countryData.postalCodeFormat);
    if ( !format ) {
        return 'Failed to load postal code format "' + countryData.postalCodeFormat + '".';
    }

    var preparedPostalCode = postalCode.toString().trim().slice(0);
    for (var i = 0; i < format.RedundantCharacters.length; i++) {
        preparedPostalCode = preparedPostalCode.replace(new RegExp(format.RedundantCharacters[i], 'g'), '');
    }

    var expression = format.ValidationRegex;
    if ( expression instanceof Array ) {
        expression = '^' + expression.join('|') + '$';
    }

    const regexp = new RegExp(expression, 'i');
    var result = regexp.exec(preparedPostalCode);

    if ( !result ) {
        // Invalid postal code
        return "Postal code " + preparedPostalCode + " is not valid for country " + preparedCountryCode;
    }

    if ( result[0].toLowerCase() != preparedPostalCode.toLowerCase() ) {
        // Found "sub" match
        return "Postal code " + preparedPostalCode + " is not valid for country " + preparedCountryCode;
    }

    return true;
};
