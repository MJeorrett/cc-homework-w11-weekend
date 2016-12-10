var populateTableWithParts = function( partsTable, partsArray, cityModel ) {
  numberOfCountries = partsArray.length / 20;
  console.log( "Populating table with", partsArray.length, "parts" );
  var partsTableBody = partsTable.querySelector( 'tbody' );
  for ( var i = 0; i < numberOfCountries; i++ ) {
    var tr = htmlHelper.create( 'tr' );
    var city = cityModel.getRandomCity();
    var countryTd = htmlHelper.create( 'td', city.country );
    var cityTd = htmlHelper.create( 'td', city.name );
    var partTd = htmlHelper.create( 'td', "?" );
    tr.appendChild( countryTd );
    tr.appendChild( cityTd );
    tr.appendChild( partTd );
    partsTableBody.appendChild( tr );
  };
};
