var loadFile = require( './file_loader' );
var fs = require( 'fs' );

// CODE FOR PARSING ALL SETS DATA

// var jsonString = loadFile( 'all_sets_json.txt' );
//
// var allSetsObject = JSON.parse( jsonString );
//
// var outputSetsArray = allSetsObject.results.map( function( setObject ) {
//   return {
//     id: setObject.set_id,
//     name: setObject.descr,
//     imageUrl: setObject.img_big
//   };
// });
//
// var writeStream = fs.createWriteStream( 'all_sets_json_parsed.txt' );
// writeStream.write( JSON.stringify( outputSetsArray ) );
// writeStream.end();

// CODE FOR PARSING COUNTRIES DATA

var citiesString = loadFile( 'world_cities.txt' );
var citiesLines = citiesString.split( "\n" );

var fieldNames = citiesLines[0].split( "," );
var numFields = fieldNames.length;
citiesLines.splice( 0, 1 );

var city;
var cityData;
var fieldName;

var citiesArray = citiesLines.map( function( cityLine ) {
  city = {};
  cityData = cityLine.split( "," );
  for ( var i = 0; i < numFields; i++ ) {
    fieldName = fieldNames[i];
    city[fieldName] = cityData[i];
  }
  return city;
});

var citiesWriteStream = fs.createWriteStream( 'cities.json' );
citiesWriteStream.write( JSON.stringify( citiesArray ) );
citiesWriteStream.end();
