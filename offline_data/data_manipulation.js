var fs = require( 'fs' );

var loadFile = require( './file_loader.js' );

var citiesString = loadFile( 'cities.json' );
var cities = JSON.parse( citiesString );

var countriesString = loadFile( 'countries.json' );
var countries = JSON.parse( countriesString );

// console.log(cities[0]);
// console.log(countries[0]);

var findCountryWithCode = function( alpha2Code ) {
  var lowerCaseCode = alpha2Code.toLowerCase();
  var country = countries.find( function( country ) {
    return country.alpha2Code.toLowerCase() === lowerCaseCode;
  });
  return country ? country.name : null;
};

var output = cities.map( function( city ) {
  var countryName = findCountryWithCode( city.Country );
  return countryName ? {
    country: countryName,
    name: city.City,
    lat: parseFloat( city.Latitude ),
    lng: parseFloat( city.Longitude )
  } : null;
});

var finalOutput = output.filter( function( entry ) {
  return entry != null;
});

console.log( "output length:", output.length );
console.log( "finalOutput length:", finalOutput.length );

console.log( output[345] );

var writeStream = fs.createWriteStream( 'countries_clean.json' );
writeStream.write( JSON.stringify( finalOutput ) );
writeStream.end();
