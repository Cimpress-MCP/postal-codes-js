'use strict';

const postalCodes = require('../postal-codes.js');
const expect = require('chai').expect;

describe('Postal codes validation: ', function () {

    const countriesData = require('../generated/postal-codes-alpha2');
    Object.keys(countriesData).map(function (alpha2Code) {

        var formatFileName = countriesData[alpha2Code].postalCodeFormat;
        if ( !formatFileName ) {
            console.log('Cannot find format file for ' + alpha2Code);
            return;
        }

        const format = require('../formats/' + formatFileName);
        format.TestData.Valid.map(function (validPostalCode) {
            it(alpha2Code + ' / ' + validPostalCode + ' is valid', function () {
                expect(postalCodes.validate(alpha2Code, validPostalCode)).to.be.true;
                expect(postalCodes.validate(alpha2Code, validPostalCode, { forceFormatWeb: true})).to.be.true;
            })
        });

        format.TestData.Invalid.map(function (invalidPostalCode) {
            it(alpha2Code + ' / ' + invalidPostalCode + ' is NOT valid', function () {
                expect(postalCodes.validate(alpha2Code, invalidPostalCode)).to.not.be.true;
                expect(postalCodes.validate(alpha2Code, invalidPostalCode, { forceFormatWeb: true})).to.not.be.true;
            })
        });
    });
});

describe('Postal codes border cases: ', function () {
    const testCases = [
        {
            countryCode: null,
            postalCode: 1234,
            description: 'should return error when country code is null',
            expectedResult: 'Missing country code.'
        },
        {
            countryCode: undefined,
            postalCode: 1234,
            description: 'should return error when country code is undefined',
            expectedResult: 'Missing country code.'
        },
        {
            countryCode: 'us',
            postalCode: null,
            description: 'should return error when postal code is null',
            expectedResult: 'Missing postal code.'
        },
        {
            countryCode: 'gb',
            postalCode: undefined,
            description: 'should return error when postal code is undefined',
            expectedResult: 'Missing postal code.'
        },
        {
            countryCode: 'chf',
            postalCode: 8001,
            description: 'should return false when country code is unknown',
            expectedResult: 'Unknown alpha2/alpha3 country code: CHF'
        },
        {
            countryCode: 'ch',
            postalCode: '80010',
            description: 'should return false when postal code is invalid',
            expectedResult: "Postal code 80010 is not valid for country CH"
        },
        {
            countryCode: 'ch',
            postalCode: '8001',
            description: 'should return true when postal code is valid string',
            expectedResult: true
        },
        {
            countryCode: 'ch',
            postalCode: 8001,
            description: 'should return true when postal code is valid number',
            expectedResult: true
        },
        {
            countryCode: ' us ',
            postalCode: ' 98001 ',
            description: 'should trim white spaces in input',
            expectedResult: true
        },
        {
            countryCode: 'HK',
            postalCode: 'Hong Kong',
            description: 'should return true all the time because it does not use postal codes',
            expectedResult: true
        }
    ];

    testCases.forEach(function (test) {
        it(`${test.description}`, function () {
            expect(postalCodes.validate(test.countryCode, test.postalCode)).to.equal(test.expectedResult);
        });
    });
});