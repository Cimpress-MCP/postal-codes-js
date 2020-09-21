var fs = require('fs');
var path = require('path');

function generateMappings() {

    var basePath = __dirname;

    var data = require(path.join(basePath,'../mappings/alpha2-to-formats.json'));

    var countryFormats = {}
    Object.keys(data).map(function (formatName) {
        var countries = data[formatName];
        countries.map(function (countryName) {
            countryFormats[countryName] = formatName;
        })
    });

    var byAlpha3 = {}
    var byAlpha2 = {}
    var countryDataByAlpha3 = require(path.join(basePath,'../mappings/iso-3-country-code-mapping.json'))
    Object.keys(countryDataByAlpha3).map(function (alpha3) {
        var countrySpecificData = countryDataByAlpha3[alpha3]
        var alpha2 = countrySpecificData.iso2CountryCode;

        countrySpecificData['postalCodeFormat'] = countryFormats[alpha2];
        countrySpecificData['alpha2'] = alpha2;
        countrySpecificData['alpha3'] = alpha3;
        countrySpecificData['numeric3'] = countrySpecificData['isoNumericCountryCode'];

        delete countrySpecificData['iso2CountryCode'];
        delete countrySpecificData['isoNumericCountryCode'];

        if (!countrySpecificData.postalCodeFormat) {
            fs.exists(path.join(basePath,'../formats/', alpha2 + ".json"), function(isThere){
                if(isThere) {
                    countrySpecificData.postalCodeFormat = alpha2 + '.json';
                    return;
                }

                console.log( 'Missing postal code format: ' + alpha2 + '/' + alpha3);
            });
        }

        byAlpha2[alpha2] = countrySpecificData;
        byAlpha3[alpha3] = countrySpecificData;
    });

    fs.writeFileSync(path.join(basePath,'../generated/postal-codes-alpha2.json'), JSON.stringify(byAlpha2, null, "    "));
    fs.writeFileSync(path.join(basePath,'../generated/postal-codes-alpha3.json'), JSON.stringify(byAlpha3, null, "    "));
}

generateMappings();
