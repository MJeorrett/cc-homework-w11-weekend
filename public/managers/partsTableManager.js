var populateTableWithParts = function( partsArray, cityModel ) {
  numberOfCountries = partsArray.length / 20;
  console.log( "populating table with", partsArray.length, "parts" );
  var partsTable = document.querySelector( '#parts-table' );
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
